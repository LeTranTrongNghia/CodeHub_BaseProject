import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Triangle, Bell, User } from "lucide-react";

const HeaderCommunity = () => {
    return (
        <header className="border-b px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className='ml-4'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='outline' size='icon' aria-label='Home'>
                                    <Triangle className='size-5 fill-foreground' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='bottom' sideOffset={5}>
                                <p>CodeHub</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <h1 className="text-2xl font-bold">CodeHub</h1>
                <nav className="hidden md:flex space-x-4">
                    <Button variant="ghost">Learn</Button>
                    <Button variant="ghost">Practice</Button>
                    <Button variant="ghost">Build</Button>
                    <Button variant="ghost">Community</Button>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="outline">Join Club</Button>
                <Bell className="h-6 w-6" />
                <User className="h-6 w-6" />
            </div>
        </header>
    );
};

export default HeaderCommunity; 