import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { User, MessageCircle } from "lucide-react";
import { CreatePostDialog } from './createPost_btn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChannelsSidebar = ({ setSelectedChannel, setActiveChannelId, userData, defaultChannelId }) => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user);
    const [channels, setChannels] = useState([]);
    const [activeChannelId, setActiveChannelIdState] = useState(defaultChannelId);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await fetch(`http://localhost:5050/channels`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChannels(data);
            } catch (error) {
                console.error('Error fetching channels:', error);
            }
        };

        fetchChannels();
    }, []);

    const handleChannelClick = (channel) => {
        setSelectedChannel({ name: channel.name, description: "Description for " + channel.name });
        setActiveChannelIdState(channel._id);
        setActiveChannelId(channel._id);
        navigate(`/community?channelId=${channel._id}`);
    };

    const handleMyPostsClick = () => {
        navigate(`/community/profile/${currentUser.id}`);
    };

    return (
        <aside className="w-64 border-r p-4 hidden md:block">
            <div className="mb-4">
                <Button variant="ghost" className="w-full justify-start" onClick={handleMyPostsClick}>
                    <User className="mr-2 h-4 w-4" /> My Posts
                </Button>
            </div>
            {/* <div className="mb-4">
                <Button variant="ghost" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" /> Town Square
                </Button>
            </div> */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Channels</h3>
                {channels.map((channel) => (
                    <Button
                        key={channel._id}
                        variant={activeChannelId === channel._id ? "" : "ghost"}
                        className={`w-full justify-start mb-1`}
                        onClick={() => handleChannelClick(channel)}
                    >
                        <span className="mr-2">{channel.icon}</span> {channel.name}
                    </Button>
                ))}
            </div>
            {/* <CreatePostDialog
                trigger={<Button className="w-full">Create Post</Button>}
                userData={userData}
                currentChannelId={activeChannelId || defaultChannelId}
            /> */}
        </aside>
    );
};

export default ChannelsSidebar;
