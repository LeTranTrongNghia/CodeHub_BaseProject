import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, ThumbsUp, MessageSquare, Bookmark, Link, Bell, EyeOff, Eye, AlertTriangle } from "lucide-react"

const NewsCard = ({ author, username, timeAgo, content, avatarURL, imageUrl, likes, comments, poll, onClick }) => {
    const contentLines = content.split('\n');

    return (
        <Card className="mb-4 cursor-pointer">
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <img src={avatarURL} className="rounded-full h-10 w-10" alt={author} />
                        <div>
                            <h3 className="font-semibold">{author}</h3>
                            <p className="text-sm text-muted-foreground">@{username} • {timeAgo}</p>
                        </div>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
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
                    <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-2 h-4 w-4" /> {likes} Likes
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> {comments} Comments
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
