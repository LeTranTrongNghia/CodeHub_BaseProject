import { Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
	return (
		<section className='space-y-6 py-12 sm:py-20 lg:py-20 text-white'>
			<div className='container flex max-w-5xl flex-col items-center gap-5 text-center'>
				<Button asChild size='sm' className=''>
					<div href='#'>
						<span className='mr-3'>🎉</span> Introducing on{' '}
						<Github className='ml-3 h-4 w-4' />
					</div>
				</Button>
				<h1 className='text-balance font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[66px]'>
					Learning how to code with{' '}
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-extrabold'>
						CodeHub
					</span>
				</h1>

				<p className='max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
					The platform that helps you learn how to code in different programming
					languages with CodeHub AI assistant.
				</p>

				<div className='flex justify-center space-x-2 md:space-x-4'>
					<Button asChild size='sm'>
						<a href='/login'>
							<span>Explore now</span>
							<ArrowRight className='ml-3 h-4 w-4' />
						</a>
					</Button>
					<Button asChild size='sm' className=''>
						<a href='https://github.com/tsdevtool/CodeHub_BaseProject.git'>
							<Github className='h-4 w-4' />
							<span className='ml-3'>Star on Github</span>
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Header;
