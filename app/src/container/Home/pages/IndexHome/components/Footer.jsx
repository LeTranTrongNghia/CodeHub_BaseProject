import { Triangle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const Footer = () => {
    return (
        <footer class="border-t">
            <div class="border-t py-4">
                <div class="container flex items-center justify-between">
                    <p class="text-left text-sm text-muted-foreground">
                        Built by{" "}
                        <a
                            href="https://github.com/LeTranTrongNghia"
                            target="_blank"
                            rel="noreferrer"
                            class="font-medium underline underline-offset-4"
                        >
                            TrongNghia
                        </a>
                        {" "}&{" "}
                        <a
                            href="https://github.com/ngcuyen"
                            target="_blank"
                            rel="noreferrer"
                            class="font-medium underline underline-offset-4"
                        >
                            NgocUyen
                        </a>
                    </p>

                    <div class="flex items-center gap-3">
                        <a href='https://github.com/tsdevtool/CodeHub_BaseProject.git'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='outline' size='icon' aria-label='Home'>
                                            <Github className='size-5 fill-foreground' />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side='top' sideOffset={5}>
                                        <p>Star on Github</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


