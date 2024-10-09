import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';

const Problem = () => {
	return (
		<div className='w-full bg-gray-700 flex flex-col space-y-1 p-3 rounded border border-gray-700 mt-4'>
			<div className='flex justify-between item-center'>
				<div className='flex items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 text-yellow-500'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
					</svg>
					<p className='text-white font-bold text-sm ml-1'>
						76
						<span className='text-white font-normal'> (12 comment)</span>
					</p>
				</div>
				<div className='flex items-center cursor-pointer space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-white'>
					<AiFillLike className='text-dark-blue-s' />
					<span className='text-lg'>123</span>
				</div>
				<div className='bg-green-300 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block mt-1 mb-1'>
					Easy
				</div>
			</div>
			<h3
				className='font-medium text-white md:text-3xl text-xl cursor-pointer'
				onClick={() => (window.location.href = '/coding')}
			>
				Reverse a String
			</h3>

			{/* <p className="md:text-lg text-white text-base">The best kept secret of The Bahamas is the country’s sheer size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
							<p className="text-xl font-black text-white">
								$110
								<span className="font-normal text-white text-base">/night</span>
							</p> */}
		</div>
	);
};
export default Problem;
