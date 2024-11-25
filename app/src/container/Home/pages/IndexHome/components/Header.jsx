import { Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';

const Header = () => {
	const animate = {
		initial: {
			y: '-50%',
			opacity: 0,
		},
		open: (i) => ({
			y: '0%',
			opacity: 1,
			transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
		}),
	};

	return (
		<section className='space-y-6 py-12 sm:py-20 lg:py-20'>
			<div className='container flex max-w-5xl flex-col items-center gap-5 text-center'>
				<motion.div
					initial="initial"
					animate="open"
					variants={animate}
					custom={0}
				>
					<AnimatedGradientText>
						<span className='mr-3'>🎉</span> 
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'>
							Introducing on
						</span>
						<Github className='ml-3 h-4 w-4' />
					</AnimatedGradientText>
				</motion.div>
				<motion.h1
					variants={animate}
					initial="initial"
					animate="open"
					custom={1}
					className='font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[96px]'
				>
					Learn to Code with
				</motion.h1>
				<motion.h1
					variants={animate}
					initial="initial"
					animate="open"
					custom={2}
					className='font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[96px]'
				>
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-bold'>
						CodeHub
					</span>
				</motion.h1>

				<motion.p
					variants={animate}
					initial="initial"
					animate="open"
					custom={3}
					className='mt-4 max-w-2xl leading-normal text-muted-foreground text-2xl sm:text-2xl sm:leading-10'
				>
					The platform that helps you learn how to code in different programming
					languages with CodeHub AI assistant.
				</motion.p>

				<div className='mt-4 flex justify-center space-x-2 md:space-x-4'>
					<Button asChild size='sm'>
						<motion.a
							href='/login'
							initial="initial"
							animate="open"
							variants={animate}
							custom={4}
						>
							<span>Explore now</span>
							<ArrowRight className='ml-3 h-4 w-4' />
						</motion.a>
					</Button>
					<Button asChild size='sm' className=''>
						<motion.a
							href='https://github.com/LeTranTrongNghia/CodeHub_BaseProject'
							initial="initial"
							animate="open"
							variants={animate}
							custom={4}
						>
							<Github className='h-4 w-4' />
							<span className='ml-3'>Star on Github</span>
						</motion.a>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Header;
