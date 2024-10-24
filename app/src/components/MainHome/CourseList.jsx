import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { setEnrolledCourses } from '@/redux/userReducer/userReducer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const dispatch = useDispatch();
	const enrolledCourses = useSelector((state) => state.user.enrolledCourses);

	// Fetch danh sách khóa học
	useEffect(() => {
		async function fetchCourses() {
			try {
				const response = await fetch('http://localhost:5050/course/');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setCourses(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		fetchCourses();
	}, []);

	// Xử lý khi người dùng nhấp vào khóa học
	const handleCourseClick = async (courseId) => {
		// Kiểm tra nếu khóa học đã được đăng ký
		if (enrolledCourses.includes(courseId)) {
			console.log('Course already enrolled, no need to add.');
			return;
		}

		try {
			// Lấy token từ localStorage
			const token = localStorage.getItem('authToken');
			if (!token) {
				throw new Error('User is not authenticated');
			}

			// Gửi yêu cầu thêm khóa học vào danh sách người dùng
			await axios.patch(
				'http://localhost:5050/user/add-course',
				{ courseId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			console.log('Course ID saved successfully');
			// Cập nhật lại danh sách khóa học đã đăng ký trong Redux
			dispatch(setEnrolledCourses([...enrolledCourses, courseId]));
		} catch (error) {
			console.error('Error saving course ID: ', error);
		}
	};

	// Hiển thị giao diện khi đang loading hoặc có lỗi
	if (loading) return <div className='container mx-auto p-4'>Loading...</div>;
	if (error) return <div className='container mx-auto p-4'>Error: {error}</div>;

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<Topbar />
			<Sidebar />
			<div className='grid grid-cols-4 gap-4 p-4 md:gap-8 md:p-8 ml-16'>
				{courses.map((course, index) => (
					<Card className='w-[350px]' key={index}>
						<CardHeader>
							<CardTitle>
								<div className='flex justify-between'>
									<div>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<p className='line-clamp-2 overflow-hidden text-overflow-ellipsis whitespace-normal'>
														{course.title}
													</p>
												</TooltipTrigger>
												<TooltipContent side='bottom' sideOffset={5}>
													<p>{course.title}</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>

									<div className="ml-2">
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button variant="outline" size="icon">
														<p>{course.language_short}</p>
													</Button>
												</TooltipTrigger>
												<TooltipContent side="bottom" sideOffset={5}>
													<p>{course.language}</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</div>
							</CardTitle>
							<CardDescription><p>{course.author}</p></CardDescription>
						</CardHeader>
						<CardContent>
							<Link to={`/new-courses/${course._id}`} onClick={() => handleCourseClick(course._id)}>
								<div
									className="grid gap-2 w-full h-[170px] place-items-center rounded bg-cover bg-no-repeat"
									style={{ backgroundImage: `url(${course.image_cover})` }}
								></div>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default CourseList;
