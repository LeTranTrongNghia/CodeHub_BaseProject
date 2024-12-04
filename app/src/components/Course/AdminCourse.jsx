import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/MainHome/Sidebar';
import Topbar from '@/components/MainHome/Topbar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';
import { Table, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for the course form
    const [courseTitle, setCourseTitle] = useState('');
    const [courseOverview, setCourseOverview] = useState('');
    const [courseAuthor, setCourseAuthor] = useState('');
    const [courseImage, setCourseImage] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [courseLanguageShort, setCourseLanguageShort] = useState('');

    // State for the lecture form
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [lectureTitle, setLectureTitle] = useState('');
    const [lectureTime, setLectureTime] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [timelines, setTimelines] = useState([{ title: '', time: '' }]); // State for timeline entries

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5050/course/'); // Replace with your API URL
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data.data.items); // Accessing the items array from the response
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCourseSelect = (courseId) => {
        setSelectedCourseId(courseId);
    };

    const saveLecture = async () => {
        const newLecture = {
            video_link: videoLink || '', // Ensure this is a string, even if empty
            video_id: 1, // Default to 1
            course_id: selectedCourseId,
            timeline: timelines, // Use the timelines state
            updated_at: new Date().toISOString(), // Current time for each lecture
        };

        try {
            const response = await fetch('http://localhost:5050/lecture/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLecture),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get the error response
                throw new Error(`Failed to save lecture: ${errorData.message || 'Unknown error'}`);
            }

            // Reset lecture form fields
            setLectureTitle('');
            setLectureTime('');
            setVideoLink('');
            setSelectedCourseId('');
            setTimelines([{ title: '', time: '' }]); // Reset timelines

            // Optionally, you can handle the response or update the UI accordingly
        } catch (err) {
            console.error(err); // Log the error to the console for debugging
            setError(err.message);
        }
    };

    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        const newCourse = {
            author: courseAuthor,
            image_cover: courseImage,
            language: courseLanguage,
            language_short: courseLanguageShort,
            title: courseTitle,
            overview: courseOverview,
            updated_at: new Date().toISOString(), // Current time
        };

        try {
            const response = await fetch('http://localhost:5050/course/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            if (!response.ok) {
                throw new Error('Failed to add course');
            }

            // Reset course form fields
            setCourseTitle('');
            setCourseOverview('');
            setCourseAuthor('');
            setCourseImage('');
            setCourseLanguage('');
            setCourseLanguageShort('');

            // Refetch courses to update the list
            await fetchCourses(); // Call fetchCourses to refresh the data

        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddTimeline = () => {
        setTimelines([...timelines, { title: '', time: '' }]); // Add a new timeline entry
    };

    const handleTimelineChange = (index, field, value) => {
        const newTimelines = [...timelines];
        newTimelines[index][field] = value;
        setTimelines(newTimelines);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='flex min-h-screen w-full flex-col'>
            <Topbar />
            <Sidebar />
            <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16'>
                <Card>
                    <CardHeader>
                        <h1 className='text-3xl font-medium'>Courses</h1>
                        <CardDescription>
                            <h1 className='text-sm font-medium'>
                                Explore our courses designed for all skill levels!
                            </h1>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Course Form */}
                        <form onSubmit={handleSubmitCourse} className="space-y-4">
                            <Input
                                type='text'
                                placeholder='Course Title'
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            />
                            <Input
                                type='text'
                                placeholder='Course Overview'
                                value={courseOverview}
                                onChange={(e) => setCourseOverview(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            />
                            <Input
                                type='text'
                                placeholder='Course Author'
                                value={courseAuthor}
                                onChange={(e) => setCourseAuthor(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            />
                            <Input
                                type='text'
                                placeholder='Image Cover URL'
                                value={courseImage}
                                onChange={(e) => setCourseImage(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            />
                            <Input
                                type='text'
                                placeholder='Language'
                                value={courseLanguage}
                                onChange={(e) => setCourseLanguage(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            />
                            <Input
                                type='text'
                                placeholder='Language Short'
                                value={courseLanguageShort}
                                onChange={(e) => setCourseLanguageShort(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            />
                            <Button type="submit" className="mt-4">
                                Add Course
                            </Button>
                        </form>

                        {/* Lecture Form */}
                        <h2 className='text-lg font-medium mt-8'>Add Lecture</h2>
                        <Input
                            type='text'
                            placeholder='Search Course Title'
                            onChange={(e) => {
                                const searchTerm = e.target.value.toLowerCase();
                                const filteredCourses = courses.filter(course =>
                                    course.title.toLowerCase().includes(searchTerm)
                                );
                                setCourses(filteredCourses);
                            }}
                            className='border rounded-md px-3 py-2 w-full'
                        />
                        <div className="mt-2">
                            <h3>Select Course:</h3>
                            <select
                                value={selectedCourseId}
                                onChange={(e) => handleCourseSelect(e.target.value)}
                                className='border rounded-md px-3 py-2 w-full'
                            >
                                <option value="">Select a course</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Input
                            type='text'
                            placeholder='Lecture Title'
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            className='border rounded-md px-3 py-2 w-full mt-2'
                        />
                        <Input
                            type='text'
                            placeholder='Video Link (optional)'
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            className='border rounded-md px-3 py-2 w-full mt-2'
                        />
                        <h3 className='mt-4'>Timelines</h3>
                        {timelines.map((timeline, index) => (
                            <div key={index} className="flex space-x-2 mt-2">
                                <Input
                                    type='text'
                                    placeholder='Timeline Title'
                                    value={timeline.title}
                                    onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                                    className='border rounded-md px-3 py-2 w-full'
                                />
                                <Input
                                    type='text'
                                    placeholder='Time (e.g., 00:00)'
                                    value={timeline.time}
                                    onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                                    className='border rounded-md px-3 py-2 w-full'
                                />
                            </div>
                        ))}
                        <Button type="button" onClick={handleAddTimeline} className="mt-2">
                            Add Timeline
                        </Button>
                        <Button type="button" onClick={saveLecture} className="mt-4">
                            Add Lecture
                        </Button>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Overview</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map(course => (
                                    <Course course={course} key={course._id} />
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <TableRow className='border-b transition-colors hover:bg-muted/50 cursor-pointer'>
            <td className='p-4 align-middle'>
                <Link to={`/courses/${course._id}`} className='block'>
                    {course.title}
                </Link>
            </td>
            <td className='p-4 align-middle'>
                <Link to={`/courses/${course._id}`} className='block'>
                    {course.overview}
                </Link>
            </td>
        </TableRow>
    );
};

export default AdminCourse;