import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import HeaderCommunity from './components/HeaderCommunity';
import EventsSidebar from './components/EventsSidebar';
import { useSelector } from 'react-redux';

export default function PostDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const { data } = location.state || {};
	const [post, setPost] = useState(null);
	const [newComment, setNewComment] = useState('');
	const [comments, setComments] = useState([]);
	const currentUserId = useSelector(state => state.user);
	const [currentUserData, setCurrentUserData] = useState(null);

	// console.log(currentUserId.id);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`http://localhost:5050/posts/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch post');
				}
				const data = await response.json();
				setPost(data);
				setComments(data.comments || []);
			} catch (error) {
				console.error('Error fetching post:', error);
			}
		};

		fetchPost();
	}, [id]);

	const fetchCurrentUserData = async () => {
		try {
			const response = await fetch('http://localhost:5050/users');
			if (!response.ok) {
				throw new Error('Failed to fetch users');
			}
			const users = await response.json();
			const currentUser = users.find(user => user._id === currentUserId.id);
			setCurrentUserData(currentUser);
			// console.log(currentUser);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	useEffect(() => {
		fetchCurrentUserData();
	}, [currentUserId.id]);

	const handleAddComment = async () => {
		if (newComment.trim() && currentUserData) {
			const commentData = {
				userId: currentUserData._id,
				username: currentUserData.username,
				avatar: currentUserData.avatar || 'https://via.placeholder.com/150',
				content: newComment,
				createdAt: new Date().toLocaleString(),
			};

			try {
				const response = await fetch(
					`http://localhost:5050/posts/${id}/comments`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ comment: commentData }),
					},
				);

				if (!response.ok) {
					throw new Error('Failed to add comment');
				}

				const updatedPost = await response.json();
				setComments(updatedPost.comments);
				setNewComment('');
			} catch (error) {
				console.error('Error adding comment:', error);
			}
		}
	};

	const renderContent = content => {
		return content.split('\n').map((line, index) => (
			<p key={index} className='mb-2'>
				{line.includes('http') ? (
					<a
						href={line}
						className='text-blue-500 underline'
						target='_blank'
						rel='noopener noreferrer'
					>
						{line}
					</a>
				) : (
					line
				)}
			</p>
		));
	};

	if (!post) return <div>Loading...</div>;

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<HeaderCommunity />
			<div className='flex'>
				<main
					className='flex-1 px-14 py-6 overflow-y-auto'
					style={{ maxHeight: 'calc(100vh - 64px)' }}
				>
					<div className='flex items-center space-x-2'>
						<Button
							variant='ghost'
							onClick={() => navigate('/community')}
							className='p-0 h-auto'
						>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Back to Community
						</Button>
					</div>

					<Card className='mt-4'>
						<CardContent className='p-6'>
							<div className='flex items-start space-x-4'>
								<Avatar>
									<AvatarImage src={post.avatarURL} />
									<AvatarFallback>{post.author[0]}</AvatarFallback>
								</Avatar>
								<div className='flex-1'>
									<div className='flex items-center space-x-2'>
										<h2 className='font-semibold'>{post.author}</h2>
										<span className='text-sm text-muted-foreground'>
											{post.timeAgo}
										</span>
									</div>
									<div className='mt-2'>{renderContent(post.content)}</div>
									<img src={post.imageUrl} alt='post image' />
								</div>
							</div>
						</CardContent>
					</Card>

					<div className='pt-4'>
						<Card>
							<CardContent className='p-4'>
								<div className='flex items-start space-x-4'>
									<Avatar>
										<AvatarImage
											src={
												currentUserData
													? currentUserData.avatar
													: 'https://via.placeholder.com/150'
											}
											alt='User'
										/>
										<AvatarFallback>
											{currentUserData ? currentUserData.username[0] : 'U'}
										</AvatarFallback>
									</Avatar>
									<div className='flex-1'>
										<Input
											placeholder={`Type here to reply to ${post.author}...`}
											value={newComment}
											onChange={e => setNewComment(e.target.value)}
										/>
										<Button
											className='mt-2'
											size='sm'
											onClick={handleAddComment}
										>
											Post comment
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='space-y-4'>
						<h3 className='font-semibold pt-4'>{comments.length} comments</h3>
						{comments.map((comment, index) => (
							<Card key={index}>
								<CardContent className='p-4'>
									<div className='flex items-start space-x-4'>
										<Avatar>
											<AvatarImage
												src={
													comment
														? comment.avatar
														: 'https://via.placeholder.com/150'
												}
												alt='User'
											/>
											<AvatarFallback>
												{comment ? comment.username[0] : 'U'}
											</AvatarFallback>
										</Avatar>
										<div className='flex-1'>
											<div className='flex items-center space-x-2'>
												<h4 className='font-semibold'>{comment.username}</h4>
												<span className='text-sm text-muted-foreground'>
													{comment.createdAt}
												</span>
											</div>
											<p className='mt-1'>{comment.content}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</main>
				<EventsSidebar />
			</div>
		</div>
	);
}
