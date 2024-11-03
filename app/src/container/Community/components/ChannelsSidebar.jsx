import React from 'react';
import { Button } from "@/components/ui/button";
import { User, MessageCircle } from "lucide-react";
import { CreatePostDialog } from './createPost_btn';

const ChannelsSidebar = () => {
    // Fixed channels data
    const channels = [
        { name: "General", icon: "🌐" },
        { name: "Introductions", icon: "👋" },
        { name: "Python", icon: "🐍" },
        { name: "JavaScript", icon: "🟨" },
        { name: "Web Dev", icon: "🌐" },
        { name: "Career", icon: "💼" },
        { name: "Memes", icon: "😂" },
        { name: "#30NitesOfCode", icon: "🌙" },
        { name: "Pets", icon: "🐾" },
        { name: "Checkpoint", icon: "🏁" },
        { name: "Final Project", icon: "🏆" },
    ];

    return (
        <aside className="w-64 border-r p-4 hidden md:block">
            <div className="mb-4">
                <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" /> My Posts
                </Button>
            </div>
            <div className="mb-4">
                <Button variant="ghost" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" /> Town Square
                </Button>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Channels</h3>
                {channels.map((channel) => (
                    <Button key={channel.name} variant="ghost" className="w-full justify-start mb-1">
                        <span className="mr-2">{channel.icon}</span> {channel.name}
                    </Button>
                ))}
            </div>
            <CreatePostDialog trigger={<Button className="w-full">Create Post</Button>} />
        </aside>
    );
};

export default ChannelsSidebar;
