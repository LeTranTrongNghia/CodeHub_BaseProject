import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Sidebar from "../../MainHome/Sidebar";
import Topbar from "../../MainHome/Topbar";
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const userEmail = useSelector((state) => state.user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:5050/users?email=${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (userEmail) {
      fetchUser();
    }

    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:5050/course/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
  }, [userEmail]); // Thêm userEmail vào dependency để khi thay đổi email, useEffect sẽ chạy lại

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Topbar />
      <Sidebar />
      <div className="grid grid-cols-4 gap-4 p-4 md:gap-8 md:p-8 ml-16">
        {/* User Greet */}
        <div className="col-span-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-xl">
            T
          </div>
          <div>
            <h1 className="text-xl font-semibold">Welcome back, TrongNghia</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Full Stack Web Developer</span>
              <Button variant="link" className="text-sm text-purple-600 p-0">
                Edit profile
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="col-span-4 relative bg-purple-500 rounded-lg overflow-hidden h-[300px] flex">
          <Card className="w-1/2 z-10 bg-white p-6 rounded-lg m-10">
            <h2 className="text-2xl font-bold mb-2">Master Programming with CodeHub</h2>
            <p className="text-gray-600 mb-4">
              From basics to advanced, CodeHub provides interactive courses and intelligent support to accelerate your coding journey.
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
            <h2 className="text-2xl font-bold">Let's start learning</h2>
            <Button variant="link" className="text-purple-600">
              My learning
            </Button>
          </div>
          <Card className="w-80">
            <img
              className="object-cover w-full h-full"
              src='/src/assets/cover.png'
              alt='preview landing'
              loading='eager'
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
              <p className="text-sm text-gray-600">Introduction to Cloud Computing</p>
              <h3 className="font-semibold">1. Introduction</h3>
            </div>
          </Card>
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
            <span className="text-purple-600">The Complete Cyber Security Course : Hackers Exposed!</span>
            "
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card 
                key={i} 
                className="flex flex-col" 
                onClick={() => navigate(`/coursedetail`)}
              >
                <div className="aspect-video relative bg-gray-100 rounded-t-lg">
                  <img
                    src="/src/assets/cover.png?height=200&width=300"
                    alt="Course thumbnail"
                    className="object-cover rounded-t-lg w-full h-full"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold mb-2">The Complete Cyber Security Course</h3>
                  <p className="text-sm text-gray-600 mb-2">Instructor Name</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                    JavaScript
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">Popular for Full Stack Web Developers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="flex flex-col">
                <div className="aspect-video relative bg-gray-100 rounded-t-lg">
                  <img
                    src="/src/assets/cover.png?height=200&width=300"
                    alt="Course thumbnail"
                    className="object-cover rounded-t-lg w-full h-full"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold mb-2">The Complete Cyber Security Course</h3>
                  <p className="text-sm text-gray-600 mb-2">Instructor Name</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                    JavaScript
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
