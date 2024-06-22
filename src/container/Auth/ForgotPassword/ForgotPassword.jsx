import { auth } from '@/firebase/firebase';
import { Alert, Button, Form, Input } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const onFinish = async values => {
		const { email } = values;
		try {
			await sendPasswordResetEmail(auth, email);
			toast('Please check your email to reset password');
			navigate('/login');
		} catch (error) {
			toast.error('Reset password failed');
			console.log(error);
		}
	};
	return (
		<div
			className='min-h-screen bg-cover bg-center'
			style={{
				backgroundImage: `url(https://images.pexels.com/photos/7134986/pexels-photo-7134986.jpeg)`,
			}}
		>
			<div className='min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Forgot your password
					</h2>
				</div>

				<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
						<Form onFinish={onFinish}>
							<h3 className='mb-5 text-center'>
								Enter your email to get your new password!
							</h3>
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700'
								>
									Email address
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
													message='please input your email'
													banner
													type='error'
												/>
											),
										},
									]}
								>
									<Input
										className='flex appearance-none rounded-md relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										classNames={{
											input: 'text-md font-normal',
										}}
										placeholder='Enter your email'
									/>
								</Form.Item>
							</div>

							<Form.Item>
								<Button
									htmlType='submit'
									className='btn-submit w-full p-0 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
								>
									RESET
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
