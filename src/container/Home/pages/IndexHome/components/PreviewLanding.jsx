const PreviewLanding = () => {
	return (
		<div className='pb-6 sm:pb-16'>
			<div className='container max-w-7xl'>
				<div className='rounded-xl md:bg-muted/10 md:p-3 md:ring-1 md:ring-inset md:ring-border'>
					<div className='relative aspect-video overflow-hidden rounded-xl'>
						<img
							className='w-full h-full object-cover object-center'
							src='/src/assets/Main.png'
							alt='preview landing'
							loading='eager'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewLanding;
