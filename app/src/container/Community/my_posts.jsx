import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	ArrowRight,
	Briefcase,
	Share,
	Star,
	Search,
	Timer,
	Flame,
	ChevronLeft,
} from 'lucide-react';
import HeaderCommunity from './components/HeaderCommunity';
import EventsSidebar from './components/EventsSidebar';
import ActivitySidebar from './components/ActivitySidebar';
import NewsCard from './components/NewsCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import EditProfileDialog from './components/EditProfileDialog';

export default function MyPosts() {
	const navigate = useNavigate();
	const { userId } = useParams();
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState(null);
	const currentUser = useSelector(state => state.user);
	const isOwnProfile = currentUser.id === userId;
	const [sortOption, setSortOption] = useState('newest');
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`http://localhost:5050/users`);
				const users = await response.json();
				const foundUser = users.find(user => user._id === userId);
				setUserData(foundUser || null);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		const fetchUserPosts = async () => {
			try {
				const response = await fetch(`http://localhost:5050/posts`);
				const allPosts = await response.json();
				const userPosts = allPosts.filter(post => post.userID === userId);
				setPosts(userPosts);
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchUserData();
		fetchUserPosts();
	}, [userId]);

	const handleDeletePost = async postId => {
		try {
			const response = await fetch(`http://localhost:5050/posts/${postId}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Failed to delete post');
			setPosts(posts.filter(post => post._id !== postId));
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	const handleUpdatePost = async (postId, updatedData) => {
		try {
			const response = await fetch(`http://localhost:5050/posts/${postId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedData),
			});
			if (!response.ok) throw new Error('Failed to update post');
			setPosts(
				posts.map(post =>
					post._id === postId ? { ...post, ...updatedData } : post,
				),
			);
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	const handlePostClick = postId => {
		navigate(`/community/post/detail/${postId}`, {
			state: {
				currentUserId: currentUser.id,
				data: userData,
			},
		});
	};

	const sortedPosts = () => {
		if (sortOption === 'newest') {
			return [...posts].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);
		} else if (sortOption === 'mostLiked') {
			return [...posts].sort((a, b) => {
				if (b.likes.length === a.likes.length) {
					return b.comments.length - a.comments.length;
				}
				return b.likes.length - a.likes.length;
			});
		}
		return posts;
	};

	const searchedPosts = () => {
		const trimmedSearchTerm = searchTerm.trim();
		if (!trimmedSearchTerm) return sortedPosts();
		return sortedPosts().filter(
			post =>
				post.userID.includes(trimmedSearchTerm) ||
				post.content.toLowerCase().includes(trimmedSearchTerm.toLowerCase()) ||
				post.author.toLowerCase().includes(trimmedSearchTerm.toLowerCase()),
		);
	};

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<HeaderCommunity />
			<div className='flex'>
				<aside className='w-64 p-4 hidden md:block'>
					<div className='mb-4'>
						<Button
							variant='ghost'
							className='w-full flex justify-center items-center'
							onClick={() => navigate('/community')}
						>
							<ChevronLeft className='mr-2 h-4 w-4' /> Back to community
						</Button>
					</div>
				</aside>
				<main
					className='flex-1 p-4 overflow-y-auto'
					style={{ maxHeight: 'calc(100vh - 64px)' }}
				>
					{/* Profile Card Section */}
					<div className='rounded-xl overflow-hidden bg-white shadow-lg mb-6'>
						<div className='h-48 bg-gradient-to-r from-orange-400 via-pink-500 via-blue-500 to-green-400' />
						<div className='px-8 pb-8'>
							<div className='flex flex-col md:flex-row md:items-end mb-8 gap-4'>
								<div className='relative -mt-20'>
									<div className=' w-48 h-48 rounded-full border-4 border-white overflow-hidden bg-white'>
										<img
											src={userData?.avatar || '/placeholder.svg'}
											alt='Profile picture'
											className='w-full h-full object-cover'
										/>
									</div>
								</div>
								<div className='flex-grow mt-4'>
									<h1 className='text-3xl font-bold mb-1'>
										{userData?.username || 'Loading...'}
									</h1>
									<p className='text-sm text-muted-foreground mb-1'>
										@{userData?._id || 'Loading...'}
									</p>
									<p className='text-muted-foreground mb-4 break-words w-[260px]'>
										{userData?.address || 'Location'}
									</p>
									{isOwnProfile && (
										<div className='flex gap-3'>
											<EditProfileDialog
												userData={userData}
												onProfileUpdate={updatedUser => {
													setUserData(updatedUser);
												}}
											/>
										</div>
									)}
								</div>
								<div className='md:text-right mt-4 md:mt-0'>
									<div className='flex items-center justify-end gap-2 text-muted-foreground mb-2'>
										<span>Current position</span>
										<Briefcase className='w-5 h-5' />
									</div>
									<p className='font-medium text-lg'>
										{userData?.position || 'position'}
									</p>
								</div>
							</div>

							{/* Skills Section */}
							<div className='mb-8'>
								<div className='flex items-center gap-2 mb-3'>
									<h2 className='text-lg font-semibold'>Skills</h2>
									<Star className='w-5 h-5 text-muted-foreground' />
								</div>
								<div className='flex flex-wrap gap-2'>
									{(userData?.skills || ['HTML', 'CSS', 'JavaScript']).map(
										skill => (
											<span
												key={skill}
												className='px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm'
											>
												{skill}
											</span>
										),
									)}
								</div>
							</div>

							{/* Action Cards - Only show on own profile */}
							{isOwnProfile && (
								<div className='grid md:grid-cols-3 gap-4'>
									{[
										{
											title: 'Ready for work',
											description:
												"Show recruiters that you're ready for work.",
											icon: <Briefcase className='w-5 h-5' />,
										},
										{
											title: 'Share news',
											description:
												'Share latest news to get connected with others.',
											icon: <Share className='w-5 h-5' />,
										},
										{
											title: 'Update',
											description:
												'Keep your profile updated so that recruiters know you better.',
											icon: <ArrowRight className='w-5 h-5' />,
										},
									].map(card => (
										<Card
											key={card.title}
											className='p-4 hover:bg-secondary transition-colors cursor-pointer group'
										>
											<h3 className='font-semibold mb-2 flex items-center gap-2'>
												{card.title}
												{card.icon}
											</h3>
											<p className='text-sm text-muted-foreground'>
												{card.description}
											</p>
										</Card>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Posts Section */}
					<div className='flex items-center mb-4 justify-between'>
						<div className='flex items-center'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='outline' className='mr-2'>
										Sort Posts
										{sortOption === 'newest' ? (
											<Timer className='ml-2 h-4 w-4' />
										) : null}
										{sortOption === 'mostLiked' ? (
											<Flame className='ml-2 h-4 w-4' />
										) : null}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem onClick={() => setSortOption('newest')}>
										<Button variant={sortOption === 'newest' ? '' : 'ghost'}>
											Newest First <Timer className='ml-2 h-4 w-4' />
										</Button>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setSortOption('mostLiked')}>
										<Button variant={sortOption === 'mostLiked' ? '' : 'ghost'}>
											Most Liked <Flame className='ml-2 h-4 w-4' />
										</Button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className='relative flex items-center ml-auto w-full max-w-xs'>
							<Search className='absolute left-2 h-4 w-4 text-gray-400' />
							<Input
								className='pl-8 w-full'
								placeholder='Search posts...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{searchedPosts().map(post => (
						<NewsCard
							key={post._id}
							postId={post._id}
							author={post.author}
							username={post.userID}
							timeAgo={post.timeAgo}
							content={post.content}
							avatarURL={post.avatarURL}
							imageUrl={post.imageUrl}
							likes={post.likes}
							comments={post.comments}
							userID={post.userID}
							onClick={() => handlePostClick(post._id)}
							onDelete={() => handleDeletePost(post._id)}
							onUpdate={updatedContent =>
								handleUpdatePost(post._id, { content: updatedContent })
							}
						/>
					))}
				</main>
				<EventsSidebar />
				<ActivitySidebar />
			</div>
		</div>
	);
}
