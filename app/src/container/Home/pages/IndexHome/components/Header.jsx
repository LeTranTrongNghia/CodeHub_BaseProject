import SparklesText from "@/components/ui/sparkles-text";
import { motion } from 'framer-motion';

const Header = () => {
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
		<main className="flex max-w-full mx-20 mt-10 px-6 pt-20 pb-32 text-center">			
			<div className="absolute inset-0">
				<div className='mt-10'>
					<motion.h1
						className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-5xl mx-auto"
						initial="initial"
						animate="open"
						variants={animate}
					>
						Unlock{" "}
						<span className="text-[#4945FF] font-extrabold text-6xl">programming</span> mastery through{" "}
						AI learning platform <SparklesText className="mt-2 text-[#4945FF]" text={"CodeHub"}/>
					</motion.h1>
					<motion.p
						className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto"
						initial="initial"
						animate="open"
						variants={animate}
					>
						Build custom portals, CRMs, and tools effortlessly. From concept to launch in minutes, not months.
					</motion.p>
				</div>
			</div>
		</main>
	);
};

export default Header;
