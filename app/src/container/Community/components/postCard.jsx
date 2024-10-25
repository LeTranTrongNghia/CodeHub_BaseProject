"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, ThumbsUp, MessageSquare, Send, Share2, Smile, Bookmark, Link, Bell, Eye, EyeOff, AlertTriangle } from "lucide-react"

export default function SocialMediaCard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [comments, setComments] = useState([
        { id: 1, author: "John Doe", content: "Great job on your first React project!", timestamp: "20 hours ago" },
        { id: 2, author: "Alice Smith", content: "I'd love to see the code. Is it open source?", timestamp: "1 day ago" },
        { id: 3, author: "Bob Johnson", content: "Impressive work! Keep it up.", timestamp: "1 day ago" },
    ])
    const [newComment, setNewComment] = useState("")

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: comments.length + 1, author: "Current User", content: newComment, timestamp: "Just now" }])
            setNewComment("")
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Card className="mb-4 cursor-pointer bg-white text-black shadow-md" onClick={() => setIsDialogOpen(true)}>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">Shadcn 👩‍💻</h3>
                                    <p className="text-sm text-muted-foreground">@Shadcn • 5h ago</p>
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
                                            <Bookmark className="mr-2 h-4 w-4" /> Save video
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
                                            <Eye className="mr-2 h-4 w-4" /> Hide all from Jane Doe
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
                                            <AlertTriangle className="mr-2 h-4 w-4" /> Report
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <p className="mb-2">Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.</p>
                        <a href="/" className="text-blue-600 hover:underline">https://github.com/shadcn-ui/ui</a>
                        <div className="flex items-center mt-4 space-x-4">
                            <Button variant="ghost" size="sm">
                                <ThumbsUp className="mr-2 h-4 w-4" /> 28 Likes
                            </Button>
                            <Button variant="ghost" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" /> {comments.length} Comments
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Jane Doe's post</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <p>Just finished my first React project! It's a simple todo app, but I'm really proud of it. Check it out and let me know what you think!</p>
                        <a href="/" className="text-blue-600 hover:underline">https://github.com/jane_codes/react-todo-app</a>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                        <div>1 Like</div>
                        <div>{comments.length} Comments</div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <Button variant="ghost" size="sm" className="flex-1 text-gray-500">
                            <ThumbsUp className="mr-2 h-4 w-4" /> Like
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 text-gray-500">
                            <MessageSquare className="mr-2 h-4 w-4" /> Comment
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 text-gray-500">
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                    </div>
                </div>
                <div className="mt-4 max-h-[300px] overflow-y-auto space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://i.pravatar.cc/32?u=${comment.id}`} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-gray-100 rounded-lg p-2">
                                <p className="font-semibold">{comment.author}</p>
                                <p>{comment.content}</p>
                                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                    <button className="hover:underline">Like</button>
                                    <button className="hover:underline">Reply</button>
                                    <span>{comment.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center mt-4 space-x-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-100 rounded-full">
                        <Input
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-black placeholder-gray-500"
                        />
                    </div>
                    <Button size="sm" variant="ghost" onClick={handleAddComment} disabled={!newComment.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                        <Smile className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}