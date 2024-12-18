import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";
import Sidebar from "../MainHome/Sidebar";
import Topbar from "../MainHome/Topbar";
import { Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);

  // Fetch current user from Redux store
  const currentUser = useSelector(state => state.user);

  // Fetch all users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5050/users/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Set users data to state

        // Find the current user in the fetched users
        const foundUser = data.find(user => user._id === currentUser.id);
        if (foundUser) {
          setUsers(prevUsers => prevUsers.map(user =>
            user._id === currentUser.id ? foundUser : user
          )); // Update users state with the found user
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUsers();
  }, [currentUser.id]); // Dependency on currentUser.id

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5050/course/'); // Fetch courses from API
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data.data.items); // Update state with courses data
    } catch (err) {
      console.error(err.message);
    }
  };

  // Get the current user's data from the users array
  const currentUserData = users.find(user => user._id === currentUser.id) || {};

  // Hàm để lấy dữ liệu bài học từ API
  const fetchLessons = async () => {
    try {
      const response = await fetch('http://localhost:5050/progress/'); // Lấy dữ liệu từ API
      if (!response.ok) {
        throw new Error('Failed to fetch progress');
      }
      const data = await response.json();
      const userLessons = data.data.items.find(progress => progress.user_id === currentUser.id); // Tìm bài học của user hiện tại
      if (userLessons) {
        setLessons(userLessons.lessons); // Cập nhật trạng thái với bài học của user
      } else {
        setLessons([]); // Nếu không tìm thấy bài học, đặt lessons thành mảng rỗng
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchLessons(); // Gọi hàm fetchLessons khi component mount
  }, [currentUser.id]); // Phụ thuộc vào currentUser.id

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Topbar />
      <Sidebar />
      <div className="grid grid-cols-4 gap-4 p-4 md:gap-8 md:p-8 ml-16">
        {/* User Greet */}
        <div className="col-span-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-xl">
            <img
              src={currentUserData.avatar || '/placeholder.svg'}
              alt='Profile picture'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Welcome back, {currentUserData.username || 'User'}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{currentUserData.position}</span>
              {/* <Button variant="link" className="text-sm text-purple-600 p-0">
                Edit profile
              </Button> */}
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="col-span-4 relative bg-purple-500 rounded-lg overflow-hidden h-[300px] flex">
          <Card className="w-1/2 z-10 bg-white p-6 rounded-lg m-10">
            <h2 className="text-2xl font-bold mb-2">Master Programming with DevLab</h2>
            <p className="text-gray-600 mb-4">
              From basics to advanced, DevLab provides interactive courses and intelligent support to accelerate your coding journey.
            </p>
            <Button variant="default" className="bg-black text-white hover:bg-gray-800">
              Learn more
            </Button>
          </Card>
          <div className="w-1/2 flex items-center justify-end">
            <img
              src="/src/assets/cover.png?height=400&width=400"
              alt="Certification illustration"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Learning Section */}
        <div className="col-span-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Completed Lessons</h2>
            <Button variant="link" className="text-purple-600">
              My learning
            </Button>
          </div>

          {/* Display lessons in the Completed Lessons section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
            {lessons.length > 0 ? (
              lessons
                .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date)) // Sắp xếp theo completion_date giảm dần
                .slice(0, 5) // Chỉ lấy 5 bài gần nhất
                .map((lesson) => {
                  const course = courses.find(course => course._id === lesson.course_id);
                  return (
                    <Card key={lesson.course_id} className="flex flex-col">
                      <img
                        className="object-cover w-full h-40"
                        src={course ? course.image_cover : '/src/assets/cover.png'}
                        alt="preview landing"
                        loading="eager"
                      />
                      <div className="relative bg-black aspect-video rounded-t-lg">
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="p-4 mt-4">
                        <p className="text-sm text-gray-600">{lesson.lecture_name}</p>
                        <h3 className="font-semibold">{course ? course.title : "Course not found"}</h3>
                      </div>
                    </Card>
                  );
                })
            ) : (
              <p>No lessons available.</p>
            )}
          </div>
        </div>

        {/* Business Banner */}
        <div className="col-span-4 bg-black text-white p-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Expand your learning with premium courses!</span>
            <span>Upgrade your account to access expert-level programming lessons and advanced coding challenges.</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-black hover:bg-blue-500 hover:text-white">
              Upgrade to Pro
            </Button>
            <Button variant="ghost" className="text-white hover:bg-red-400 hover:text-white">
              Dismiss
            </Button>
          </div>
        </div>

        {/* Course Recommendations */}
        <div className="col-span-4">
          <h2 className="text-2xl font-bold mb-4">What to learn next</h2>
          <p className="mb-4">
            Because you viewed "
            <span className="text-purple-600">
              {lessons.length > 0 ? courses.find(course => course._id === lessons[lessons.length - 1].course_id)?.title : 'No course found'}
            </span>
            "
          </p>
          <div className="grid grid-cols-5 gap-4">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="flex flex-col"
                onClick={() => navigate(`/courses/detail/${course._id}`)}
              >
                <div className="aspect-video relative bg-gray-100 rounded-t-lg">
                  <img
                    src={course.image_cover || "/src/assets/cover.png?height=200&width=300"}
                    alt="Course thumbnail"
                    className="object-cover rounded-t-lg w-full h-full"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.author}</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                    {course.language_short}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
