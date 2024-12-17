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
		<footer className='border-t'>
			<div className='border-t py-4'>
				<div className='container flex items-center justify-between'>
					<p className='text-left text-sm text-muted-foreground'>
						Built by{' '}
						<a
							href='https://github.com/LeTranTrongNghia'
							target='_blank'
							rel='noreferrer'
							className='font-medium underline underline-offset-4'
						>
							TrongNghia
						</a>{' '}
						,{' '}
						<a
							href='https://github.com/ngcuyen'
							target='_blank'
							rel='noreferrer'
							className='font-medium underline underline-offset-4'
						>
							NgocUyen
						</a>{' '}
						&{' '}
						<a
							href='https://github.com/tsdevtool'
							target='_blank'
							rel='noreferrer'
							className='font-medium underline underline-offset-4'
						>
							ThanhSieu
						</a>
					</p>

					<div className='flex items-center gap-3'>
						<a href='https://github.com/LeTranTrongNghia/CodeHub_BaseProject.git'>
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
