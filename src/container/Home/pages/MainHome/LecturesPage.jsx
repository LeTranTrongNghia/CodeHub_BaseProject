<<<<<<< HEAD
import React from 'react';
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
=======
import { Button } from '@/components/ui/button';
import React from 'react';
import Sidebar from '@/components/MainHome/Sidebar';
import Topbar from '@/components/MainHome/Topbar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
>>>>>>> 4e21b4d0cc7de3f336eb7b3b5ad51fed787a8ede

const LecturesPage = () => {
	return (
		<div className='flex min-h-screen w-full flex-col bg-black'>
			{/* Topbar */}
			<Topbar />
			{/* Sidebar */}
			<Sidebar />
			{/* Mainbar */}
			<main className='gap-4 p-4 md:gap-8 md:p-8 ml-16'>
				<div class='aspect-w-16 aspect-h-9 flex w-full'>
					<iframe
						src='https://www.youtube.com/embed/jS4aFq5-91M'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowfullscreen
					></iframe>
				</div>
			</main>
		</div>
	);
};

export default LecturesPage;
