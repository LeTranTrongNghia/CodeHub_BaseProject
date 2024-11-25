import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

const PreviewLanding = () => {
	return (
		<div className='container max-w-6xl mt-16'>
			<NeonGradientCard>
				<div className='relative w-full h-full overflow-hidden'>
					<img
						className='w-full h-full object-cover object-center rounded-[20px]'
						src='/src/assets/Main.png'
						alt='preview landing'
						loading='eager'
					/>
				</div>
			</NeonGradientCard>
		</div>
	);
};

export default PreviewLanding;
