import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreatePostDialog } from '@/container/Community/components/createPost_btn';
import { useNavigate } from 'react-router-dom';
import { Image} from "lucide-react"
import ChannelsSidebar from './components/ChannelsSidebar'
import EventsSidebar from './components/EventsSidebar'
import HeaderCommunity from './components/HeaderCommunity'
import ChannelOverview from './components/ChannelOverview';
import NewsCard from './components/NewsCard';
import { useSelector } from 'react-redux';
import { fetchCurrentUserData } from '@/services/userService';

export default function MainFeed() {
	const navigate = useNavigate();
	const [selectedChannel, setSelectedChannel] = useState({ name: "General", description: "Community-wide conversations" });
	const [posts, setPosts] = useState([]);
	const currentUser = useSelector(state => state.user);
	const [userData, setUserData] = useState(null);
	const [activeChannelId, setActiveChannelId] = useState('672c2053df5ed078edd28a8b');
	const [channels, setChannels] = useState([]);

	const currentUserID = userData ? userData._id : null;

	useEffect(() => {
		const fetchPosts = async () => {
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

		const fetchUserData = async () => {
			const data = await fetchCurrentUserData(currentUser.username);
			setUserData(data);
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

		fetchPosts();
		fetchUserData();
		fetchChannels();
	}, [currentUser.username]);

	// Filter posts based on the active channel ID
	const filteredPosts = posts.filter(post => post.channelId === activeChannelId);

	const handleDeletePost = async (postId) => {
		try {
			const response = await fetch(`http://localhost:5050/posts/${postId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete post');
			}
			// Refresh posts after deletion
			setPosts(posts.filter(post => post._id !== postId));
		} catch (error) {
			console.error('Error deleting post:', error);
		}
	};

	// Function to refresh posts
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

	// Function to update a post
	const handleUpdatePost = async (postId, updatedContent) => {
		try {
			const response = await fetch(`http://localhost:5050/posts/${postId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content: updatedContent }),
			});
			if (!response.ok) {
				throw new Error('Failed to update post');
			}
			// Refresh posts after update
			refreshPosts();
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<HeaderCommunity />
			<div className="flex">
				<ChannelsSidebar
					setSelectedChannel={setSelectedChannel}
					setActiveChannelId={setActiveChannelId}
					userData={userData}
					defaultChannelId={activeChannelId}
				/>
				<main className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
					<ChannelOverview
						title={selectedChannel.name}
						description={selectedChannel.description}
						onlineCount={250}
						imageUrl="https://i.pinimg.com/originals/24/41/da/2441dacfd5703b140a2816f82bd0f9c7.gif"
					/>

					<CreatePostDialog
						trigger={
							<Card className="mb-4">
								<CardContent className="p-4">
									<div className="flex items-center space-x-2 mb-2">
										<Avatar>
											<AvatarImage 
												src={userData ? userData.avatar : "https://default-avatar-url.com"}
												alt="User" 
											/>
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
										<Input
											className="flex-1"
											placeholder="You need to reach 250 XP to make a post."
										/>
									</div>
									<div className="flex justify-between items-center">
										<Button variant="ghost" size="sm">
											<Image className="mr-2 h-4 w-4" /> Add Image
										</Button>
										<Button size="sm" disabled>Post</Button>
									</div>
								</CardContent>
							</Card>
						}
						userData={userData}
						currentChannelId={activeChannelId || '672c2053df5ed078edd28a8b'} // Default channel ID
						onPostCreated={refreshPosts} // Pass the refresh function
					/>

					{filteredPosts.map(post => (
						<NewsCard
							key={post._id}
							author={post.author}
							username={post.userID}
							timeAgo={post.timeAgo}
							content={post.content}
							avatarURL={post.avatarURL}
							imageUrl={post.imageUrl}
							likes={post.likes}
							comments={post.comments}
							userID={post.userID}
							currentUserID={currentUserID}
							onClick={() => navigate(`/community/post/detail/${post._id}`)}
							onDelete={() => handleDeletePost(post._id)}
							onUpdate={(updatedContent) => handleUpdatePost(post._id, updatedContent)} // Pass update function
						/>
					))}
				</main>
				<EventsSidebar />
			</div>
		</div>
	)
}