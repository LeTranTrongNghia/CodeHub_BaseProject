import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Clock, ChevronLeft } from 'lucide-react';
import Sidebar from "../MainHome/Sidebar";
import Topbar from "../MainHome/Topbar";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get course ID from URL
  const [courseData, setCourseData] = useState(null);
  const [lectureData, setLectureData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course data
        const response = await fetch(`http://localhost:5050/course/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourseData(data.data); // Ensure this is the correct structure
        // console.log("Course data:", data.data); // Log course data
      } catch (err) {
        setError(err.message); // Set error message
        console.error("Error fetching course details: ", err.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };


    fetchCourseDetails();
    fetchLectureDetails();
  }, [id]);

  const fetchLectureDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5050/lecture/`);
      if (!response.ok) {
        throw new Error('Failed to fetch lecture data');
      }
      const data = await response.json();
      // Check if data.data is an array before filtering
      if (Array.isArray(data.data.items)) {
        // Filter lectures by course_id matching the current course's id
        const filteredLectures = data.data.items.filter(lecture => lecture.course_id === id);
        setLectureData(filteredLectures); // Set filtered lecture data
        // console.log("Filtered lecture data:", filteredLectures); // Log filtered lecture data
      } else {
        console.error("Expected data.data to be an array, but got:", data.data.items);
        setLectureData([]); // Set to empty array if not an array
      }
    } catch (err) {
      setError(err.message); // Set error message
      console.error("Error fetching lecture details: ", err.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-black">
      <Topbar />
      <Sidebar />
      <main className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 pt-12 pb-8">
          {/* Back Button */}
          <Button className="mb-4" onClick={() => navigate('/courses')}>
            <ChevronLeft className="mr-2"/>
            Back to Course List
          </Button>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">
                {courseData ? courseData.title : "Loading..."}
              </h1>
              <p className="text-lg mb-6">
                {courseData ? courseData.overview : "Loading..."}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-yellow-200 text-black">
                  {courseData ? courseData.language : "Loading..."}
                </Badge>
              </div>

              {/* Course Creator */}
              <div className="mb-6 text-blue-600">
                <span className="text-black">Created by </span>{courseData ? courseData.author : "Loading..."}
              </div>

              {/* Course Meta */}
              <div className="flex flex-wrap gap-4 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last updated 10/2024
                </div>
              </div>

              {/* What You'll Learn */}
              <Card className="bg-gray-100 border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                  <div className="space-y-4">
                    {lectureData && lectureData.length > 0 ? (
                      lectureData.map((lecture) => (
                        <div key={lecture._id} className="flex flex-col gap-2">
                          {lecture.timeline.map((item, index) => (
                            <div key={index} className="flex gap-2">
                              <span className="text-blue-600">•</span>
                              <p>{item.title} - {item.time}</p>
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p>No lectures available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg sticky top-4">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900">
                    <img
                      src={courseData ? courseData.image_cover : "Loading..."}
                      alt="Course thumbnail"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/90 p-4">
                        <Play className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
                        navigate(`/courses/detail/lecture/${courseData._id}`, { state: { lectureData, courseData } });
                      }}>
                        Enter Course
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save
                      </Button>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-semibold text-lg mb-4">This course includes:</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          <span>
                            {lectureData && lectureData.length > 0
                              ? (Math.max(...lectureData.flatMap(lecture => lecture.timeline.map(item => {
                                const [minutes, seconds] = item.time.split(':').map(Number);
                                return minutes + seconds / 60; // Convert to total minutes
                              }))) / 60).toFixed(1) // Convert to hours and format to one decimal place
                              : 0} hours on-demand video
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{lectureData ? lectureData.reduce((acc, lecture) => acc + lecture.timeline.length, 0) : 0} articles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
