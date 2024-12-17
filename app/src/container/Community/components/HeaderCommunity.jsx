import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Triangle, User } from "lucide-react";
import { useSelector } from 'react-redux';

const HeaderCommunity = () => {
    const currentUser = useSelector(state => state.user);

    const handleMyPostsClick = () => {
        navigate(`/community/profile/${currentUser.id}`);
    };

    return (
        <header className="border-b px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className='ml-4'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='outline' size='icon' aria-label='Home'>
                                    <a href="/main-home">
                                        <Triangle className='size-5 fill-foreground' />
                                    </a>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='bottom' sideOffset={5}>
                                <p>DevLab</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <h1 className="text-2xl font-bold">DevLab</h1>
                <nav className="hidden md:flex space-x-4">
                    <Button variant="ghost"><a href="/courses">Learn</a></Button>
                    <Button variant="ghost"><a href="/problems">Practice</a></Button>
                    <Button variant="ghost"><a href="/playground">Build</a></Button>
                </nav>
            </div>
        </header>
    );
};

export default HeaderCommunity; 