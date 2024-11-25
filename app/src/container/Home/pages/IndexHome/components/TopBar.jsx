import { Triangle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

const TopBar = () => {
	const animate = {
		initial: {
			y: '-50%',
			opacity: 0,
		},
		open: {
			y: '0%',
			opacity: 1,
			transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
		},
	};

	return (
		<motion.header
			className='flex h-20 items-center gap-4 border-b border-gray-300 px-4 md:px-6 justify-between'
			initial="initial"
			animate="open"
			variants={animate}
		>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<div className='ml-12'>
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
				<h1 className='ml-2 text-xl font-semibold'>CodeHub</h1>
			</nav>
			<div className='mr-12'>
				<a href='https://github.com/tsdevtool/CodeHub_BaseProject.git'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='outline' size='icon' aria-label='Home'>
									<Github className='size-5 fill-foreground' />
								</Button>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={5}>
								<p>Star on Github</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</a>
			</div>
		</motion.header>
	);
};
export default TopBar;
