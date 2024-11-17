import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const ActivitySidebar = () => {
    const [topContributors, setTopContributors] = useState([]);
    const [unansweredPosts, setUnansweredPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopContributors = async () => {
            try {
                // Fetch all posts
                const postsResponse = await fetch('http://localhost:5050/posts');
                const posts = await postsResponse.json();

                // Fetch all users
                const usersResponse = await fetch('http://localhost:5050/users');
                const users = await usersResponse.json();

                // Count comments by user
                const commentCounts = {};
                posts.forEach(post => {
                    post.comments?.forEach(comment => {
                        const userId = comment.userId;
                        commentCounts[userId] = (commentCounts[userId] || 0) + 1;
                    });
                });

                // Convert to array and sort
                const sortedContributors = Object.entries(commentCounts)
                    .map(([userId, count]) => {
                        const user = users.find(u => u._id === userId);
                        return {
                            userId,
                            username: user?.username || 'Unknown User',
                            avatar: user?.avatar || null,
                            count
                        };
                    })
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3); // Get top 3

                setTopContributors(sortedContributors);
            } catch (error) {
                console.error('Error fetching top contributors:', error);
            }
        };

        fetchTopContributors();
    }, []);

    useEffect(() => {
        const fetchUnansweredPosts = async () => {
            try {
                const response = await fetch('http://localhost:5050/posts');
                const posts = await response.json();
                
                // Filter posts with no comments and sort by date
                const unanswered = posts
                    .filter(post => !post.comments || post.comments.length === 0)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 2); // Get only the 2 most recent posts

                setUnansweredPosts(unanswered);
            } catch (error) {
                console.error('Error fetching unanswered posts:', error);
            }
        };

        fetchUnansweredPosts();
    }, []);

    return (
        <aside className="w-80 p-4 hidden lg:block">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Contributors</CardTitle>
                        <p className="text-sm py-2 text-gray-500">People who commented the most in posts.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topContributors.map((contributor) => (
                            <div key={contributor.userId} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>{contributor.username[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0 ml-2">
                                    <p className="text-sm font-medium truncate">{contributor.username}</p>
                                    <p className="text-xs text-gray-400 truncate">@{contributor.userId}</p>
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                    <MessageSquare className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500">{contributor.count}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Unanswered Talks</CardTitle>
                        <p className="text-sm text-gray-500">Posts with no comments. Be first to write a comment.</p>
                    </CardHeader>
                    <CardContent className="space-y-10">
                        {unansweredPosts.map((post) => (
                            <div key={post._id} className="flex items-start gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={post.avatarURL || "/placeholder.svg"} />
                                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{post.author}</span>
                                        <span className="text-sm text-gray-500">• {new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p 
                                        className="text-sm font-medium line-clamp-2 hover:underline cursor-pointer"
                                        onClick={() => navigate(`/community/post/detail/${post._id}`)}
                                    >
                                        {post.content}
                                    </p>
                                    <div className="flex items-center gap-1 pt-1">
                                        <MessageSquare 
                                            className="h-4 w-4 text-gray-400 cursor-pointer" 
                                            onClick={() => navigate(`/community/post/detail/${post._id}`)}
                                        />
                                        <span className="text-sm text-gray-500">0 comments</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </aside>
    );
};

export default ActivitySidebar;