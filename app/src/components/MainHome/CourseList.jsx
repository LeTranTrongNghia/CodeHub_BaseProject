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

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const userEmail = useSelector((state) => state.user.email);

  const dispatch = useDispatch();

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
        {courses.map((course, index) => (
          <Card className="w-[350px]" key={index}>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="line-clamp-2 overflow-hidden text-overflow-ellipsis whitespace-normal">
                            {course.title}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={5}>
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
              <CardDescription>
                <p>{course.author}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to={`/new-courses/${course._id}`}
                // onClick={() => handleCourseClick(course._id)}
              >
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
