const ResetPassword = () => {
	return (
		<>
			<div
				className='min-h-screen bg-cover bg-center'
				style={{
					backgroundImage: `url(https://images.pexels.com/photos/7134986/pexels-photo-7134986.jpeg)`,
				}}
			>
				<div className='min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-md'>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Reset your password
						</h2>
					</div>

					<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
							<form className='py-2'>
								<div className='py-2'>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700'
									>
										Enter your email
									</label>
									<div className='mt-1'>
										<input
											id='email'
											name='email'
											type='email'
											autocomplete='email'
											required
											className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											placeholder='Enter your email address'
										/>
									</div>
								</div>

								<button
									type='submit'
									className='group relative w-full flex justify-center mt-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									RESET
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
