import { motion } from 'framer-motion';
import SparklesText from "@/components/ui/sparkles-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { ChevronRight } from "lucide-react";

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
		<main className="flex flex-col items-center justify-center py-8 px-6 text-center">
			<motion.div
				className="max-w-4xl mx-auto space-y-8"
				initial="initial"
				animate="open"
				variants={{
					initial: {},
					open: { transition: { staggerChildren: 0.2 } },
				}}
			>
				<motion.div variants={animate} className="flex items-center justify-center space-x-2">
					<AnimatedGradientText>
						🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
						<span
							className={`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}
						>
							Introducing DevLab
						</span>
						<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
					</AnimatedGradientText>
				</motion.div>

				<motion.h1 variants={animate} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
					Unlock{' '}
					<span className="text-[#4945FF] font-extrabold">programming</span> mastery through{' '}
					AI learning platform{' '}
					<SparklesText className="text-[#4945FF]" text="DevLab" />
				</motion.h1>

				<motion.p variants={animate} className="text-xl text-gray-600 max-w-2xl mx-auto">
					Sharpen your coding skills, analyze your code instantly, and gain AI-powered insights for rapid improvement.
				</motion.p>
			</motion.div>
		</main>
	);
};

export default Header;
