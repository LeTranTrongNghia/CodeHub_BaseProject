import React, { useEffect, useState } from 'react';

function DateButton() {
	const [date, setDate] = useState(null);

	useEffect(() => {
		const updateDate = () => {
			const today = new Date();
			const formattedDate = today.toLocaleDateString();
			setDate(formattedDate);
		};

		updateDate();

		const intervalId = setInterval(updateDate, 1000);

		// Cleanup function to clear the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='flex items-center p-3 bg-black border border-white m-2 rounded-md text-white text-sm'>
			<svg
				className='w-6 h-6 mr-2 text-white'
				aria-hidden='true'
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				fill='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					fillRule='evenodd'
					d='M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 1 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z'
					clipRule='evenodd'
				/>
			</svg>
			Today's Date: {date}
		</div>
	);
}

export default DateButton;
