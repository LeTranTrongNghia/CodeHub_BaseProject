import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, ThumbsUp, MessageSquare, Bookmark, Link, Bell, EyeOff, Eye, AlertTriangle, Trash, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const formatTimeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return "Just now";
};

const NewsCard = ({ author, username, timeAgo, content, avatarURL, imageUrl, likes, comments, poll, userID, currentUserID, onClick, onDelete, onUpdate, postId }) => {
    const navigate = useNavigate();
    const contentLines = content.split('\n');
    const [showConfirm, setShowConfirm] = useState(false); // State to control confirmation dialog
    const [showUpdateDialog, setShowUpdateDialog] = useState(false); // State to control update dialog
    const [updatedContent, setUpdatedContent] = useState(content); // State for updated content
    const [userLikes, setUserLikes] = useState(likes); // Local state for likes

    const hasLiked = userLikes.includes(currentUserID); // Check if current user has liked the post

    const handleLikeToggle = async () => {
        const updatedLikes = hasLiked
            ? userLikes.filter(userId => userId !== currentUserID) // Remove like
            : [...userLikes, currentUserID]; // Add like

        setUserLikes(updatedLikes); // Update local state

        // Call the new endpoint to update likes
        await fetch(`http://localhost:5050/posts/${postId}/likes`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likes: updatedLikes }),
        });
    };

    const handleDelete = async () => {
        try {
            await onDelete(); // Call the delete function passed as a prop
            setShowConfirm(false); // Close the confirmation dialog
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Call the new endpoint to update content
            await fetch(`http://localhost:5050/posts/${postId}/content`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: updatedContent }),
            });
            setShowUpdateDialog(false);
            onUpdate(updatedContent); // Call the onUpdate prop to refresh the posts
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handlePopoverClick = () => {
        console.log('Current User ID:', currentUserID); // Log current user ID
        console.log('Post User ID:', userID); // Log post user ID
    };

    return (
        <Card className="mb-4 cursor-pointer" onClick={() => navigate(`/community/post/detail/${postId}`)}>
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <img src={avatarURL} className="rounded-full h-10 w-10" alt={author} />
                        <div>
                            <h3 className="font-semibold">{author}</h3>
                            <p className="text-sm text-muted-foreground">@{username} • {formatTimeAgo(timeAgo)}</p>
                        </div>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handlePopoverClick(); }}>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 bg-white text-black border border-gray-200 shadow-lg" align="end">
                            <div className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <Bookmark className="mr-2 h-4 w-4" /> Save
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <Link className="mr-2 h-4 w-4" /> Copy link
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <Bell className="mr-2 h-4 w-4" /> Turn on notifications
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <EyeOff className="mr-2 h-4 w-4" /> Hide post
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <Eye className="mr-2 h-4 w-4" /> Hide all user's post
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <AlertTriangle className="mr-2 h-4 w-4" /> Report
                                </Button>
                                {userID === currentUserID && (
                                    <>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100" onClick={() => setShowUpdateDialog(true)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Update
                                                </Button>
                                            </DialogTrigger> 
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Update Post</DialogTitle>
                                                </DialogHeader>
                                                <textarea
                                                    value={updatedContent}
                                                    onChange={(e) => setUpdatedContent(e.target.value)}
                                                    className="w-full h-32 border p-2"
                                                />
                                                <div className="flex space-x-2 mt-4">
                                                    <Button variant="secondary" onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
                                                    <Button variant="destructive" onClick={handleUpdate}>Update</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100" onClick={() => setShowConfirm(true)}>
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                                </DialogHeader>
                                                <p>Are you sure you want to delete this post?</p>
                                                <div className="flex space-x-2 mt-4">
                                                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                                                    <Button variant="destructive" onClick={handleDelete}>Yes, Delete</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div onClick={onClick} className="cursor-pointer">
                    {contentLines.map((line, index) => (
                        <p key={index} className="mb-2">
                            {line.includes('http') ? (
                                <a href={line} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                    {line}
                                </a>
                            ) : (
                                line
                            )}
                        </p>
                    ))}
                </div>
                {imageUrl && (
                    <img src={imageUrl} alt="News content" className="w-full h-auto mb-2 rounded" />
                )}
                {poll && (
                    <div className="space-y-2 mt-4">
                        {poll.map((option, index) => (
                            <Button key={index} variant="outline" className="w-full justify-start">{option}</Button>
                        ))}
                    </div>
                )}
                <div className="flex items-center mt-4 space-x-4">
                    <Button variant="ghost" size="sm" onClick={handleLikeToggle}>
                        <ThumbsUp className="mr-2 h-4 w-4" /> {userLikes.length} Likes
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> {comments.length} Comments
                    </Button>
                </div>
                {comments.length > 0 && (
                    <div className="mt-2">
                        {comments.map((comment, index) => (
                            <div key={index} className="text-sm text-muted-foreground">
                                <strong>{comment.username}</strong>: {comment.content}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default NewsCard;
