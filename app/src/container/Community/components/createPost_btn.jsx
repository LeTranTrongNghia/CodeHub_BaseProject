import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, ChevronDown, Image, Users, Smile, MapPin, Gift, MoreHorizontal } from "lucide-react"

export function CreatePostDialog({ trigger }) {
    const [postContent, setPostContent] = useState('')

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background text-foreground p-0">
                <DialogHeader className="pt-4">
                    <DialogTitle className="text-center text-xl font-bold">Create post</DialogTitle>
                </DialogHeader>
                <div className="px-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/133557378?v=4" className="rounded-full h-10 w-10" />
                            <AvatarFallback>TN</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">Trong Nghia</div>
                            <Select defaultValue="public">
                                <SelectTrigger className="w-[110px] h-6 text-xs bg-muted border-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="friends">Friends</SelectItem>
                                    <SelectItem value="private">Only me</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[150px] bg-transparent border text-lg resize-none placeholder:text-muted-foreground focus-visible:ring-0"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-semibold">Add to your post</div>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <Image className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <Users className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <Smile className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <MapPin className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <Gift className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <MoreHorizontal className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Post
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}