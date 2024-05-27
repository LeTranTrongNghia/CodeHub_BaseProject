import {
    Book,
    Code2,
    Triangle,
    LogOut 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React, {  } from 'react';

const Sidebar = () => {
    return < aside className="inset-y fixed bg-black left-0 z-20 flex h-full flex-col border-r" >
        <div className="p-2 mt-1 bg-black">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="Home">
                            <Triangle className="size-5 fill-foreground" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        <p>CodeHub Admin</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <div className="grid gap-1 p-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg bg-black text-white"
                            aria-label="API"
                        >
                            <Code2 className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Problem
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg bg-black text-white"
                            aria-label="Documentation"
                        >
                            <Book className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Courses
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <div className="mt-auto grid gap-1 p-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mt-auto rounded-lg bg-black text-white"
                            aria-label="Help"
                        >
                            <LogOut  className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Log out
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </aside >
}
export default Sidebar;