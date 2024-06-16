import './style.css';
const Loading = () => {
	return (
		<div className='follow-the-leader relative w-3.5 h-3.5 my-80 mx-auto'>
			<div
				className='bg-gray-950/90 rounded-full absolute w-full h-full'
				style={{ animationDelay: '0.15s' }}
			></div>
			<div
				className='bg-gray-950/80 rounded-full absolute w-full h-full'
				style={{ animationDelay: '0.3s' }}
			></div>
			<div
				className='bg-gray-950/70 rounded-full absolute w-full h-full'
				style={{ animationDelay: '0.45s' }}
			></div>
			<div
				className='bg-gray-950/60 rounded-full absolute w-full h-full'
				style={{ animationDelay: '0.6s' }}
			></div>
			<div
				className='bg-gray-950/50 rounded-full absolute w-full h-full'
				style={{ animationDelay: '0.75s' }}
			></div>
		</div>
	);
};

export default Loading;
