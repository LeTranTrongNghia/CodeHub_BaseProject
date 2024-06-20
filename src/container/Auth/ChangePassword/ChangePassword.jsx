import { Alert, Button, Form, Input } from 'antd';

const ChangePassword = () => {
	const onFinish = async values => {
		console.log('🚀 ~ ChangePassword ~ values:', values);
	};

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
							Change your password
						</h2>
					</div>

					<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10'>
							<Form onFinish={onFinish}>
								<div>
									<label
										htmlFor='password'
										className='block text-sm font-medium text-gray-700'
									>
										Old password
									</label>
									<Form.Item
										name='old_password'
										className='mt-1'
										rules={[
											{
												type: 'password',
												message: (
													<Alert
														className='ml-2 bg-transparent text-sm text-red-700'
														message='invalid password'
														banner
														type='error'
													/>
												),
											},
											{
												required: true,
												message: (
													<Alert
														className='ml-2 bg-transparent text-sm text-red-700'
														message='please enter old password'
														banner
														type='error'
													/>
												),
											},
										]}
									>
										<Input
											className='flex appearance-none rounded-md relative  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											classNames={{
												input: 'text-md font-normal',
											}}
											placeholder='Enter your old password'
										/>
									</Form.Item>
								</div>

								<div>
									<label
										htmlFor='password'
										className='block text-sm font-medium text-gray-700'
									>
										New password
									</label>
									<Form.Item
										name='new_password'
										className='mt-1'
										rules={[
											{
												type: 'password',
												message: (
													<Alert
														className='ml-2 bg-transparent text-sm text-red-700'
														message='invalid password'
														banner
														type='error'
													/>
												),
											},
											{
												required: true,
												message: (
													<Alert
														className='ml-2 bg-transparent text-sm text-red-700'
														message='please enter new password'
														banner
														type='error'
													/>
												),
											},
										]}
									>
										<Input.Password
											className='appearance-none rounded-md relative flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											classNames={{
												input: 'text-md font-normal',
											}}
											placeholder='Enter your new password'
										/>
									</Form.Item>
								</div>

								<div>
									<label
										htmlFor='password'
										className='block text-sm font-medium text-gray-700'
									>
										Confirm new password
									</label>
									<Form.Item
										name='confirm_password'
										className='mt-1'
										rules={[
											{
												required: true,
												message: (
													<Alert
														className='ml-2 bg-transparent text-sm text-red-700'
														message='please enter confirm password'
														banner
														type='error'
													/>
												),
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (
														!value ||
														getFieldValue('new_password') === value
													) {
														return Promise.resolve();
													}
													return Promise.reject(
														<Alert
															className='ml-2 bg-transparent text-sm text-red-700'
															message='The new password that you entered do not match!'
															banner
															type='error'
														/>,
													);
												},
											}),
										]}
									>
										<Input.Password
											className='appearance-none rounded-md relative flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											classNames={{
												input: 'text-md font-normal',
											}}
											placeholder='Enter your confirm password'
										/>
									</Form.Item>
								</div>

								<Form.Item>
									<Button
										htmlType='submit'
										className='btn-submit w-full p-0 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
									>
										Sign up
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
