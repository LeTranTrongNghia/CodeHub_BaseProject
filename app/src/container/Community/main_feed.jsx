import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CreatePostDialog } from '@/container/Community/components/createPost_btn';
import { useNavigate } from 'react-router-dom';
import { Image, Search, Timer, Flame } from 'lucide-react';
import ChannelsSidebar from './components/ChannelsSidebar';
import EventsSidebar from './components/EventsSidebar';
import HeaderCommunity from './components/HeaderCommunity';
import ChannelOverview from './components/ChannelOverview';
import NewsCard from './components/NewsCard';
import { useSelector } from 'react-redux';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import ActivitySidebar from './components/ActivitySidebar';

export default function MainFeed() {
	const navigate = useNavigate();
	const [selectedChannel, setSelectedChannel] = useState({
		name: 'General',
		description: 'Community-wide conversations',
	});
	const [posts, setPosts] = useState([]);
	const currentUser = useSelector(state => state.user);
	const [userData, setUserData] = useState(null);
	const [activeChannelId, setActiveChannelId] = useState(
		'672c2053df5ed078edd28a8b',
	);
	const [channels, setChannels] = useState([]);
	const [users, setUsers] = useState([]);
	const [sortOption, setSortOption] = useState('newest');
	const [searchTerm, setSearchTerm] = useState('');
	const currentChannel = channels.find(
		channel => channel._id === activeChannelId,
	);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('http://localhost:5050/users');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		const fetchChannels = async () => {
			try {
				const response = await fetch('http://localhost:5050/channels');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setChannels(data);
				if (data.length > 0) {
					setActiveChannelId(data[0]._id);
				}
			} catch (error) {
				console.error('Error fetching channels:', error);
			}
		};

		fetchUsers();
		fetchChannels();
	}, []);

	useEffect(() => {
		const fetchUserData = () => {
			if (users.length > 0) {
				const foundUser = users.find(user => user._id === currentUser.id);
				setUserData(foundUser || null);
			}
		};

		fetchUserData();
	}, [users, currentUser.id]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`http://localhost:5050/posts?channelId=${activeChannelId}`,
				);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, [activeChannelId]);

	const handleDeletePost = async postId => {
		try {
			const response = await fetch(`http://localhost:5050/posts/${postId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete post');
			}
			setPosts(posts.filter(post => post._id !== postId));
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	const refreshPosts = async () => {
		try {
			const response = await fetch('http://localhost:5050/posts');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	const handleUpdatePost = async (postId, updatedData) => {
		try {
			const response = await fetch(`http://localhost:5050/posts/${postId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedData),
			});
			if (!response.ok) {
				throw new Error('Failed to update post');
			}
			await refreshPosts();
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	const filteredPosts = posts.filter(
		post => post.channelId === activeChannelId,
	);

	const sortedPosts = () => {
		if (sortOption === 'newest') {
			return [...filteredPosts].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);
		} else if (sortOption === 'mostLiked') {
			return [...filteredPosts].sort((a, b) => {
				if (b.likes.length === a.likes.length) {
					return b.comments.length - a.comments.length;
				}
				return b.likes.length - a.likes.length;
			});
		}
		return filteredPosts;
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

	const handlePostClick = async postId => {
		if (!currentUser) {
			console.error('Current user is not defined');
			return;
		}

		if (!userData) {
			console.error('User data is not available');
			return;
		}

		navigate(`/community/post/detail/${postId}`, {
			state: {
				currentUserId: currentUser._id,
				data: userData,
			},
		});
	};

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<HeaderCommunity />
			<div className='flex'>
				<ChannelsSidebar
					setSelectedChannel={setSelectedChannel}
					setActiveChannelId={setActiveChannelId}
					userData={userData}
					defaultChannelId={activeChannelId}
				/>
				<main
					className='flex-1 p-4 overflow-y-auto'
					style={{ maxHeight: 'calc(100vh - 64px)' }}
				>
					<ChannelOverview
						title={selectedChannel.name}
						description={selectedChannel.description}
						onlineCount={250}
						imageUrl={currentChannel ? currentChannel.bg : ''}
					/>

					<CreatePostDialog
						trigger={
							<Card className='mb-4'>
								<CardContent className='p-4'>
									<div className='flex items-center space-x-2 mb-2'>
										<Avatar>
											<AvatarImage
												src={
													userData
														? userData.avatar
														: 'https://via.placeholder.com/150'
												}
												alt='User'
											/>
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
										<Input
											className='flex-1'
											placeholder='You need to reach 250 XP to make a post.'
										/>
									</div>
									<div className='flex justify-between items-center'>
										<Button variant='ghost' size='sm'>
											<Image className='mr-2 h-4 w-4' /> Add Image
										</Button>
										<Button size='sm' disabled>
											Post
										</Button>
									</div>
								</CardContent>
							</Card>
						}
						userData={userData}
						currentChannelId={activeChannelId || '672c2053df5ed078edd28a8b'}
						onPostCreated={refreshPosts}
					/>

					<div className='flex items-center mb-4 justify-between'>
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

						<div className='relative flex items-center ml-auto w-full max-w-xs'>
							<Search className='absolute left-2 h-4 w-4 text-gray-400' />
							<Input
								className='pl-8 w-full'
								placeholder='Search by User ID, Username, or Content'
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
							currentUserID={userData ? userData._id : null}
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
