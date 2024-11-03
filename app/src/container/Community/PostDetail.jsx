import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import HeaderCommunity from './components/HeaderCommunity';
import ChannelsSidebar from './components/ChannelsSidebar';
import EventsSidebar from './components/EventsSidebar';

export default function PostDetail() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null); // Initialize post as null
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, author: "Maciej Korsan", content: "A community of freaks, who have too much free time.", likes: 16, timestamp: "2h ago" },
        { id: 2, author: "Pawel Kadysz", content: "Very accurate.", likes: 3, timestamp: "1h ago" },
        { id: 3, author: "Mrs. Ginger", content: "I would never say I have too much time, actually I hardly have any. But thanks to Tookapic I do my best to find a while each day to find something pretty, interesting or important for me, what is worth to be in the picture.", timestamp: "5min ago" },
    ]);

    useEffect(() => {
        // Fetch the post data based on the ID
        // This is a placeholder; replace with your actual data fetching logic
        const fetchedPost = {
            id: id,
            author: "Jane Doe",
            avatar: "https://i.pinimg.com/564x/58/12/ef/5812effe012750b911f72fba0525cd27.jpg",
            content: "Just finished my first React project! Check it out!",
            timeAgo: "5h ago",
            link: "https://github.com/jane_codes/react-todo-app",
            image: "https://example.com/image.jpg", // Replace with actual image URL if available
        };
        setPost(fetchedPost);
    }, [id]);

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: comments.length + 1, author: "Current User", content: newComment, timestamp: "Just now" }]);
            setNewComment("");
        }
    };

    // Check if post is not defined and show loading state
    if (!post) return <div>Loading...</div>; // Handle loading state

    return (
        <div className="min-h-screen bg-background text-foreground">
            <HeaderCommunity />
            <div className='flex'>
                <ChannelsSidebar />
                <main className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" onClick={() => navigate('/community')} className="p-0 h-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Community
                        </Button>
                        <div className="flex-1" />
                        <Button variant="ghost" size="sm">Mute</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Report</Button>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Avatar>
                                    <AvatarImage src={post.avatar} />
                                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h2 className="font-semibold">{post.author}</h2>
                                        <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                                    </div>
                                    <p className="mt-2">{post.content}</p>
                                    {post.link && (
                                        <a href={post.link} className="text-primary hover:underline mt-2 block">{post.link}</a>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="font-semibold pt-4">{comments.length} comments</h3>
                        {comments.map((comment) => (
                            <Card key={comment.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-start space-x-4">
                                        <Avatar>
                                            <AvatarImage src={`https://avatar.vercel.sh/${comment.author}`} />
                                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-semibold">{comment.author}</h4>
                                                <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                                            </div>
                                            <p className="mt-1">{comment.content}</p>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <Button variant="ghost" size="sm">Like</Button>
                                                <Button variant="ghost" size="sm">Reply</Button>
                                                {comment.likes && <span className="text-sm text-muted-foreground">{comment.likes} likes</span>}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-start space-x-4">
                                    <Avatar>
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/133557378?v=4" />
                                    </Avatar>
                                    <div className="flex-1">
                                        <Input
                                            placeholder={`Type here to reply to ${post.author}...`}
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <Button className="mt-2" size="sm" onClick={handleAddComment}>Post comment</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <EventsSidebar />
            </div>
        </div >
    );
}
