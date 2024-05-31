import { Alert, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, firestore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserRole } from '@/helpers/constant';
import { useDispatch } from 'react-redux';
import { setAdminStatus } from '@/redux/userReducer/userReducer';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onFinish = async values => {
		const { email, password } = values;
		try {
			const existingUser = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = existingUser.user;
			const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
			const userData = userDoc.data();
			const role = userData.role;
			if (role === UserRole.ADMIN) {
				dispatch(setAdminStatus(true));
			}
			dispatch(setAdminStatus(false));
			toast.success('Logged in Successfully');
			navigate('/main-home');
		} catch (error) {
			toast.error(error.message);
		}
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
							Sign in to your account
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600 max-w'>
							Or
							<a
								onClick={() => navigate('/register')}
								className='font-medium text-indigo-700 hover:text-blue-500 pl-2'
							>
								create an account
							</a>
						</p>
					</div>

					<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
							<Form onFinish={onFinish}>
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
										Password
									</label>
									<Form.Item
										name='password'
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
														message='please input your password'
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
											placeholder='Enter your password'
										/>
									</Form.Item>
								</div>

								<div className='flex items-center justify-between '>
									<div className='flex items-center mt-2'>
										<input
											id='remember_me'
											name='remember_me'
											type='checkbox'
											className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
										/>
										<label
											htmlFor='remember_me'
											className='ml-2 block text-sm text-gray-900'
										>
											Remember me
										</label>
									</div>

									<div className='text-sm'>
										<a
											onClick={() => navigate('/forgot-password')}
											className='font-medium text-blue-600 hover:text-blue-500'
										>
											Forgot your password?
										</a>
									</div>
								</div>

								<Form.Item>
									<Button
										htmlType='submit'
										className='btn-submit w-full p-0 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
									>
										Sign in
									</Button>
								</Form.Item>
							</Form>
							<div className='mt-6'>
								<div className='relative'>
									<div className='absolute inset-0 flex items-center'>
										<div className='w-full border-t border-gray-300'></div>
									</div>
									<div className='relative flex justify-center text-sm'>
										<span className='px-2 bg-white text-gray-500'>
											Or continue with
										</span>
									</div>
								</div>

								<div className='mt-6 grid grid-cols-3 gap-3'>
									<div>
										<a
											href='#'
											className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
										>
											<img
												className='h-5 w-5'
												src='https://www.svgrepo.com/show/512120/facebook-176.svg'
												alt=''
											/>
										</a>
									</div>
									<div>
										<a
											href='#'
											className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
										>
											<img
												className='h-5 w-5'
												src='https://www.svgrepo.com/show/512317/github-142.svg'
												alt=''
											/>
										</a>
									</div>
									<div>
										<a
											href='#'
											className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
										>
											<img
												className='h-5 w-5'
												src='https://www.svgrepo.com/show/506498/google.svg'
												alt=''
											/>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
