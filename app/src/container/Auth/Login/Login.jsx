import { Alert, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import SignInwithGoogle from './SignInwithGoogle';
import SignInwithGithub from './SignInwithGithub';
import {
	setAdminStatus,
	setLoginStatus,
	setUsername,
	setEnrolledCourses, // Thêm action này để lưu danh sách khóa học đã đăng ký
	setUserId,
} from '@/redux/userReducer/userReducer';
import jwt_decode from 'jwt-decode';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onFinish = async (values) => {
		const { email, password } = values;
		try {
			const response = await fetch(`http://localhost:5050/user/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'An error occurred while logging in');
			}

			// Giải mã access token để lấy thông tin người dùng
			const { access_token, username } = data.data;
			const decodedData = jwt_decode(access_token);
			const { userId, role } = decodedData;

			// Lưu access token vào localStorage
			localStorage.setItem('authToken', access_token);

			// Gọi API để lấy danh sách khóa học đã đăng ký
			const enrolledResponse = await fetch(`http://localhost:5050/user/me`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			const enrolledData = await enrolledResponse.json();
			const { enrolledCourses } = enrolledData;

			// Lưu thông tin vào Redux store
			dispatch(setUserId(userId));
			dispatch(setUsername(username));
			dispatch(setEnrolledCourses(enrolledCourses)); // Lưu danh sách khóa học đã đăng ký
			if (role === 'Admin') {
				dispatch(setAdminStatus(true));
			}
			dispatch(setLoginStatus(true));

			// Chuyển hướng người dùng đến trang chính
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
				<div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-md'>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Sign in to your account
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600 max-w'>
							Or
							<a
								onClick={() => navigate('/register')}
								className='font-medium text-indigo-700 hover:text-blue-500 pl-2 cursor-pointer'
							>
								create an account
							</a>
						</p>
					</div>

					<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
							<Form onFinish={onFinish}>
								{/* Email Input */}
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
											placeholder='Enter your email'
										/>
									</Form.Item>
								</div>

								{/* Password Input */}
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
										<Input.Password
											className='flex appearance-none rounded-md relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											placeholder='Enter your password'
										/>
									</Form.Item>
								</div>

								{/* Submit Button */}
								<Form.Item>
									<Button
										htmlType='submit'
										className='btn-submit w-full p-0 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
									>
										Sign in
									</Button>
								</Form.Item>
							</Form>

							{/* Sign in with Google and Github */}
							<div className='mt-6 grid grid-cols-2 gap-3'>
								<SignInwithGoogle />
								<SignInwithGithub />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
