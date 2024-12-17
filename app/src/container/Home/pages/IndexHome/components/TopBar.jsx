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
		<div className="relative z-50 bg-white">
			<motion.header
				className='flex h-20 items-center gap-4 border-b border-gray-300 px-4 md:px-6 justify-between'
				initial="initial"
				animate="open"
				variants={animate}
			>
				<nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
					<div className="flex items-center space-x-2">
						<div className='ml-0'>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant='outline' size='icon' aria-label='Home'>
											<Triangle className='size-5 fill-foreground' />
										</Button>
									</TooltipTrigger>
									<TooltipContent side='bottom' sideOffset={5}>
										<p>DevLab</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<h1 className='ml-2 text-xl font-semibold'>DevLab</h1>
					</div>

					<div className="hidden md:flex items-center space-x-8">
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Home
						</a>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Product
						</a>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Features
						</a>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Assistant
						</a>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Pricing
						</a>
						<a
							href="/login"
							className="bg-[#4945FF] text-white px-4 py-2 rounded-full font-medium hover:bg-[#3f3dd3] transition-colors"
						>
							Get Started
						</a>
					</div>
					<div className='mr-0'>
						<a href='https://github.com/LeTranTrongNghia/CodeHub_BaseProject.git'>
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
				</nav>
			</motion.header>
		</div>
	);
};
export default TopBar;
