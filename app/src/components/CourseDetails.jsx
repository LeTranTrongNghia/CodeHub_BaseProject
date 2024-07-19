import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { BookMarked, Bot, ChevronLeft, CircleUser, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        async function fetchCourseDetails() {
            try {
                const response = await fetch(`http://localhost:5050/course/${id}`);
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        }
        fetchCourseDetails();
    }, [id]);

    const playLecture = (time) => {
        const [minutes, seconds] = time.split(':').map(Number);
        const startTime = minutes * 60 + seconds;
        if (videoRef.current) {
            const videoSrc = new URL(videoRef.current.src);
            videoSrc.searchParams.set('start', startTime);
            videoRef.current.src = videoSrc.toString();
            videoRef.current.play();
        }
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className='flex h-16 items-center justify-between border-b px-4 md:px-6'>
                <nav className='flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                    <div className='flex ml-14'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant='outline' size='icon'>
                                        <a href='/courses'>
                                            <ChevronLeft className='h-4 w-4' />
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side='bottom' sideOffset={5}>
                                    <p>Back to courses</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </nav>
                <div className='flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='secondary' size='icon' className='rounded-full'>
                                <CircleUser className='h-5 w-5' />
                                <span className='sr-only'>Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-2/3 lg:mr-4">
                        <div className="aspect-w-16 aspect-h-9 flex w-full">
                            <iframe
                                ref={videoRef}
                                src={course.video_link}
                                title={course.title}
                                className="rounded-lg"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-xl font-bold mb-2">Lectures</h2>
                        <div className="flex flex-col space-y-4 h-[calc(100vh-200px)] overflow-y-auto">
                            {course.lectures.map((lecture, index) => (
                                <div
                                    key={`${lecture.title_lecture}-${index}`}
                                    className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold">{lecture.title_lecture}</h3>
                                        <p className="text-gray-600">{lecture.time}</p>
                                    </div>
                                    <button
                                        onClick={() => playLecture(lecture.time)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Play
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
