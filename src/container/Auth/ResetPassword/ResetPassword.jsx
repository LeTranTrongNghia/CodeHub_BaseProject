import { Alert, Button, Form, Input } from 'antd';
import { Typography } from 'antd';

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
							Change your password
						</h2>
					</div>

					<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10'>
							<Form>
								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700'
									>
										Email
									</label>
									<Form.Item
										name='email'
										className='mt-1'
										rules={[
											{
												type: 'email',
												message: (
													<Alert
														className='ml-2 bg-transparent text-sm text-red-700'
														message='invalid email'
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
														message='please enter email'
														banner
														type='error'
													/>
												),
											},
										]}
									>
										<Input
											className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											classNames={{
												input: 'text-md font-normal',
											}}
											placeholder='Enter your email'
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
											className='flex appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
											className='flex appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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

export default ResetPassword;
