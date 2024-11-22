import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, ThumbsUp, MessageSquare, Bookmark, Link, AlertTriangle, Trash, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const formatTimeAgo = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const seconds = Math.floor((now - createdAt) / 1000);
    
    // Kiểm tra nếu thời gian tạo bài viết lớn hơn 24 giờ
    if (seconds > 86400) { // 86400 giây = 24 giờ
        return createdAt.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }

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

const NewsCard = ({ author, username, timeAgo, content, avatarURL, imageUrl, likes, comments, poll, userID, onClick, onDelete, onUpdate, postId }) => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user);
    const contentLines = content.split('\n');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [userLikes, setUserLikes] = useState(likes);
    const [users, setUsers] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5050/users');
                const data = await response.json();
                setUsers(data);
                const user = data.find(user => user._id === currentUser.id);
                if (user) {
                    setSavedPosts(user.savedPost);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [currentUser.id]);

    const hasLiked = userLikes.includes(currentUser.id);

    const handleLikeToggle = async () => {
        if (!currentUser.id) {
            console.log('No user ID provided');
            return;
        }

        try {
            const usersResponse = await fetch('http://localhost:5050/users');
            if (!usersResponse.ok) {
                throw new Error('Failed to fetch users');
            }
            const usersList = await usersResponse.json();
            
            const userExists = usersList.some(user => user._id === currentUser.id);
            if (!userExists) {
                console.log('User not found in users collection');
                return;
            }

            const isLiked = userLikes.includes(currentUser.id);

            let newLikes;
            let action;

            if (isLiked) {
                newLikes = userLikes.filter(id => id !== currentUser.id);
                action = 'unlike';
            } else {
                newLikes = [...userLikes, currentUser.id];
                action = 'like';
            }

            const response = await fetch(`http://localhost:5050/posts/${postId}/likes`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUser.id,
                    action: action
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update likes');
            }

            setUserLikes(newLikes);
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await onDelete();
            setShowConfirm(false);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Call the new endpoint to update content
            await fetch(`http://localhost:5050/posts/${postId}/content`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: updatedContent }),
            });
            setShowUpdateDialog(false);
            onUpdate(updatedContent);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handlePopoverClick = () => {
        // console.log('Current User ID:', currentUser.id);
        // console.log('Post User ID:', userID);
    };

    const handleSavePost = async () => {
        if (!currentUser.id) {
            console.log('No user ID provided');
            return;
        }

        try {
            const isSaved = savedPosts.includes(postId);
            const response = await fetch(`http://localhost:5050/users/${currentUser.id}/savedPost`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId, action: isSaved ? 'remove' : 'add' }),
            });

            if (!response.ok) {
                throw new Error('Failed to save post');
            }

            if (isSaved) {
                setSavedPosts(savedPosts.filter(id => id !== postId));
                toast.success('Post unsaved successfully!');
            } else {
                setSavedPosts([...savedPosts, postId]);
                toast.success('Post saved successfully!');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            toast.error('Error saving post!');
        }
    };

    const handleCopyLink = async () => {
        const link = `http://localhost:5173/community/post/detail/${postId}`; // Tạo liên kết
        try {
            await navigator.clipboard.writeText(link); // Sao chép liên kết vào clipboard
            toast.success('Link copied to clipboard!'); // Thông báo thành công
        } catch (error) {
            console.error('Failed to copy link:', error);
            toast.error('Failed to copy link!'); // Thông báo lỗi
        }
    };

    // useEffect(() => {
    //     console.log('Current User ID:', currentUser.id);
    //     console.log('Post User ID:', userID);
    // }, [currentUser.id, userID]);

    // Check if current user is the post owner
    const isPostOwner = currentUser.id === userID;

    return (
        <Card className="mb-4 cursor-pointer">
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
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100" onClick={handleSavePost}>
                                    <Bookmark className="mr-2 h-4 w-4" /> {savedPosts.includes(postId) ? 'Unsave' : 'Save'}
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100" onClick={handleCopyLink}>
                                    <Link className="mr-2 h-4 w-4" /> Copy link
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                    <AlertTriangle className="mr-2 h-4 w-4" /> Report
                                </Button>
                                {isPostOwner && (
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
                <div className="cursor-pointer">
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
                    <Button variant="ghost" size="sm" onClick={onClick}>
                        <MessageSquare className="mr-2 h-4 w-4" /> {comments.length} Comments
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
