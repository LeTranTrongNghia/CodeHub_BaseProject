"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, X } from 'lucide-react'
import Sidebar from "../MainHome/Sidebar";
import Topbar from "../MainHome/Topbar";
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import Note from "./Note"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react'
import { useSelector } from 'react-redux';

export default function Lecture() {
  const location = useLocation();
  const { lectureData } = location.state || {};
  const { courseData } = location.state || {};
  const [showSchedule, setShowSchedule] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const playerRef = React.useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [previousItem, setPreviousItem] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(null);
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const navigate = useNavigate();
  const id = useSelector(state => state.user.id); // Get the user ID from Redux

  // console.log("title: ", currentTitle);
  // Log the video_id of each lecture in lectureData
  useEffect(() => {
    if (lectureData && lectureData.length > 0) {
      lectureData.forEach(lecture => {
        // console.log("Video ID: ", lecture.video_id);
        setVideoId(lecture.video_id);
      });
    }
  }, [lectureData, courseData]);

  // Calculate total number of timeline items
  const totalLectures = lectureData ? lectureData.reduce((acc, lecture) => acc + lecture.timeline.length, 0) : 0;

  // Set the initial title to the first timeline title if available
  useEffect(() => {
    if (lectureData && lectureData.length > 0 && lectureData[0].timeline.length > 0) {
      setCurrentTitle(lectureData[0].timeline[0].title);
    }
  }, [lectureData]);

  const opts = {
    height: '500',
    width: '1050',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
    },
  };

  const _onReady = (event) => {
    playerRef.current = event.target;
    event.target.pauseVideo();
  };

  const handlePlayClick = async (videoId, time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    playerRef.current.seekTo(totalSeconds, true);
    playerRef.current.pauseVideo();
  };

  const handleTimelineItemClick = async (lecture, item) => {
    if (selectedItem) {
      setPreviousItem(selectedItem);
    }
    setSelectedItem(item);

    // Update currentTitle to the title of the selected item
    setCurrentTitle(item.title);

    const currentIndex = lecture.timeline.findIndex(timelineItem => timelineItem === item);

    if (currentIndex > 0) {
      // Convert time to seconds
      const [minutes, seconds] = lecture.timeline[currentIndex - 1].time.split(':').map(Number);
      const secondsValue = minutes * 60 + seconds;
      setTotalSeconds(secondsValue);
    } else {
      // Convert time to seconds for the first item
      const [minutes, seconds] = lecture.timeline[0].time.split(':').map(Number);
      const secondsValue = minutes * 60 + seconds;
      setTotalSeconds(secondsValue);
    }
    await handleGenerateQuiz();
    setIsDialogOpen(true);
  };

  const handleAnswerSelect = (answer) => {
    setAnswerSelected(answer);
    const isCorrect = answer === correctAnswer; // Check against the stored correct answer
    if (isCorrect) {
      setCurrentTitle(selectedItem.title);
      handlePlayClick(selectedItem.videoId, selectedItem.time);
      setIsDialogOpen(false); // Close dialog on correct answer
      toast.success("Correct answer!"); // Show success toast
      updateProgress(); // Gọi hàm updateProgress để lưu bài học
    } else {
      toast.error("Incorrect answer, please try again."); // Show error toast
      setIsDialogOpen(true); // Keep dialog open
    }
  };

  // New function to handle closing the dialog
  const handleCloseDialog = () => {
    setAnswerSelected(null); // Reset selected answer
    setIsDialogOpen(false); // Close the dialog
    playerRef.current.seekTo(totalSeconds, true); // Set video time back
  };

  // Function to generate a quiz question
  const generateQuizQuestion = async (lectureTitle, courseTitle) => {
    try {
      const API_KEY = import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT;
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate a multiple-choice question based on the course title: "${courseTitle}" and lecture title: "${lectureTitle}". Provide 4 answer choices and specify the correct one. The response['data']['candidates'][0]['content']['parts'][0]['text'] must return in an object THAT not contain any special symbol. And the answer should be random, should not make the answer is A {
                  "question": "A flashing red traffic light signifies that a driver should do what?",
                  "A": "stop",
                  "B": "speed up",
                  "C": "proceed with caution",
                  "D": "honk the horn",
                  "answer": "A"
                }`,
                },
              ],
            },
          ],
        },
      });

      const returnData = JSON.parse(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      return returnData;
    } catch (error) {
      console.error("Error generating question:", error);
      return null;
    }
  };

  // Example usage within your component
  const handleGenerateQuiz = async () => {
    if (lectureData && lectureData.length > 0) {
      const lectureTitle = lectureData[0].title; // Get the title of the first lecture
      const courseTitle = courseData.title; // Get the course title
      const quizQuestion = await generateQuizQuestion(lectureTitle, courseTitle);

      if (quizQuestion) {
        // console.log(quizQuestion);
        setQuizQuestion(quizQuestion.question); // Set the question from the response
        setQuizAnswers({
          A: quizQuestion.A,
          B: quizQuestion.B,
          C: quizQuestion.C,
          D: quizQuestion.D,
        }); // Set the answers from the response
        setCorrectAnswer(quizQuestion.answer); // Store the correct answer
      }
    }
  };

  const updateProgress = async () => {
    try {
      // Fetch all progress entries
      const response = await fetch('http://localhost:5050/progress/');
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const allProgress = await response.json();

      // Find the progress item for the current user
      const userProgress = allProgress.data.items.find(progress => progress.user_id === id);
      
      if (!userProgress) {
        console.error('No progress found for current user');
        return;
      }

      // Check if the lecture has already been learned
      const hasLearnedLecture = userProgress.lessons.some(lesson => 
        lesson.lecture_name === currentTitle && lesson.course_id === courseData.id
      );

      if (hasLearnedLecture) {
        console.log('Lecture has already been learned. No new lesson created.');
        return; // Exit if the lecture has already been learned
      }

      // Create new lesson entry
      const newLesson = {
        course_id: courseData._id, // Ensure this is set correctly
        lecture_name: currentTitle, // Tên bài học hiện tại
        completion_date: new Date() // Ngày hoàn thành
      };

      // Add new lesson to existing lessons array
      const updatedLessons = [...userProgress.lessons, newLesson];

      // Update progress with new lessons array
      const updateResponse = await fetch(`http://localhost:5050/progress/${userProgress._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessons: updatedLessons
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`An error occurred: ${updateResponse.statusText}`);
      }

      const data = await updateResponse.json();
      console.log('Progress updated:', data);

    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Topbar />
      <Sidebar />
      <main className="flex flex-1 flex-col ">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <Button className="mb-4" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2" />
            Back to Course Detail
          </Button>
          <div className="grid md:grid-cols-[1fr_400px]">
            {/* Main Content */}
            <div>
              {/* Video Player */}
              <div className="relative aspect-video bg-white">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  onReady={_onReady}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <Tabs defaultValue="overview">
                  <TabsList className="border-b">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="notes">Note</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="pt-6">
                    <h2 className="mb-4 text-2xl font-bold">{currentTitle}</h2>

                    <div className="mb-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-semibold">Course Includes</h3>
                        <ul className="space-y-1 text-sm">
                          <li>Total lectures: {totalLectures}</li>
                          <li>Video: {lectureData && lectureData.length > 0
                            ? (Math.max(...lectureData.flatMap(lecture => lecture.timeline.map(item => {
                              const [minutes, seconds] = item.time.split(':').map(Number);
                              return minutes + seconds / 60;
                            }))) / 60).toFixed(1)
                            : 0} total hours</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-2 font-semibold">Language</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline">JavaScript</Badge>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="notes" className="pt-6">
                    <Note />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="border-l">
              <h2 className="text-2xl ml-4 font-bold">Lecture content</h2>
              <div className="space-y-1 p-2">
                {lectureData && lectureData.length > 0 ? (
                  lectureData.map((lecture) => (
                    lecture.timeline.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 rounded p-2 hover:bg-gray-100" onClick={() => handleTimelineItemClick(lecture, item)}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="text-sm">{item.title}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {item.time}
                        </Badge>
                      </div>
                    ))
                  ))
                ) : (
                  <p>No lectures available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Question</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {quizQuestion}
            <div>
              A: {quizAnswers.A}
            </div>
            <div>
              B: {quizAnswers.B}
            </div>
            <div>
              C: {quizAnswers.C}
            </div>
            <div>
              D: {quizAnswers.D}
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => handleAnswerSelect('A')}
            >
              A
            </Button>
            <Button
              onClick={() => handleAnswerSelect('B')}
            >
              B
            </Button>
            <Button
              onClick={() => handleAnswerSelect('C')}
            >
              C
            </Button>
            <Button
              onClick={() => handleAnswerSelect('D')}
            >
              D
            </Button>
            <Button onClick={handleCloseDialog} className="absolute top-2 right-2">
              <X />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

