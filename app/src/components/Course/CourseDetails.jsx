import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Modal } from "antd";
import axios from "axios";
import { ChevronLeft, CircleUser } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Sidebar from "../MainHome/Sidebar";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const handleQuizClick = async () => {
  //   // setShowModal(true);
  //   if (!course || !course.lectures[selectedLectureIndex]) {
  //     console.error("Lecture not found");
  //     return;
  //   }

  //   const selectedLecture = course.lectures[selectedLectureIndex];
  //   const questionObj = await generateQuizQuestion(
  //     selectedLecture.title_lecture,
  //     course.title
  //   );

  //   if (questionObj) {
  //     setQuiz(questionObj);
  //     setShowModal(true);
  //   }
  // };

  const handleQuizClick = async () => {
    setIsLoading(true);
    setShowModal(true);
    try {
      if (!course || !course.lectures || selectedLectureIndex === undefined) {
        console.error("Course or lecture not found");
        setIsLoading(false);
        return;
      }

      const selectedLecture = course.lectures[selectedLectureIndex];
      if (!selectedLecture) {
        console.error("Selected lecture is invalid");
        setIsLoading(false);
        return;
      }

      const questionObj = await generateQuizQuestion(
        selectedLecture.title_lecture,
        course.title
      );

      if (questionObj) {
        setQuiz(questionObj);
        // setShowModal(true);
      } else {
        console.error("Failed to generate quiz question");
      }
    } catch (error) {
      console.error("An error occurred while generating quiz question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    const correct = option === quiz.answer;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        setShowModal(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
      });

      if (videoRef.current) {
        const player = videoRef.current.getInternalPlayer();
        player.playVideo();
      }
    }
  };

  const handleNextClick = async () => {
    // Reset the state for the next question
    setIsLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    try {
      if (!course || !course.lectures[selectedLectureIndex]) {
        console.error("Lecture not found");
        setIsLoading(false);
        return;
      }
      const selectedLecture = course.lectures[selectedLectureIndex];

      // Fetch a new quiz question (replace this with your actual fetching logic)
      const newQuiz = await generateQuizQuestion(
        selectedLecture.title_lecture,
        course.title
      ); // You should implement this function
      if (newQuiz) {
        setQuiz(newQuiz);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the next question:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                  text: `Generate a multiple-choice question based on the course title: "${courseTitle}" and lecture title: "${lectureTitle}". Provide 4 answer choices and specify the correct one. The response['data']['candidates'][0]['content']['parts'][0]['text'] must return in a object {
											"question": "A flashing red traffic light signifies that a driver should do what?",
											"A": "stop",
											"B": "speed up",
											"C": "proceed with caution",
											"D": "honk the horn",
											"answer": "A"
											} `,
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

  // Siu

  const onPlayerStateChange = (event) => {
    // access to player in all event handlers via event.target
    const player = event.target;
    // let isFirstCheck = false;
    const intervalId = setInterval(() => {
      const currentTimeVideo = Math.floor(player.getCurrentTime());
      // if (Math.abs(currentTimeVideo - lastTime) > 1) {
      //   player.seekTo(lastTime, true);
      // }
      const firstLectureTime = course?.lectures[0]
        ? convertTimeToSeconds(course.lectures[0].time)
        : null;
      // const shouldPause = course?.lectures.some((lecture) => {
      //   return currentTimeVideo === convertTimeToSeconds(lecture.time);
      // });
      const shouldPause = course?.lectures.some((lecture) => {
        const lectureTimeInSeconds = convertTimeToSeconds(lecture.time);

        if (lectureTimeInSeconds === firstLectureTime) {
          return false;
        }

        return currentTimeVideo === lectureTimeInSeconds;
      });
      // console.log(lastTime);
      console.log(player);
      console.log(shouldPause);
      if (shouldPause) {
        player.pauseVideo();
        handleQuizClick();
        // handleEvent();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // event.target.pauseVideo();
  };

  // const onPlayerStateChange = (event) => {
  //   const player = event.target;

  //   if (event.data === 2) {
  //     player.playVideo();
  //   }
  // };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
    },
  };
  const convertTimeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (videoRef.current) {
  //       videoRef.current.pause();
  //       const videoCurrentTime = Math.floor(videoRef.current.currentTime);
  //       setCurrentTime(videoCurrentTime);
  //       console.log(videoRef);
  //       const shouldPause = course?.lectures.some((lecture) => {
  //         // console.log(convertTimeToSeconds(lecture.time));
  //         return videoCurrentTime === convertTimeToSeconds(lecture.time);
  //       });
  //       if (shouldPause) {
  //         console.log("a");
  //       }
  //     }
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, [course, currentTime]);

  const updateCourseProgress = async (userId, courseId, time) => {
    try {
      const response = await axios.patch(
        "http://localhost:5050/api/users/courses",
        {
          userId,
          courseId,
          time,
        }
      );
      console.log("Courses updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating courses:",
        error.response?.data || error.message
      );
    }
  };

  // SIu
  const playLecture = (time) => {
    // const [minutes, seconds] = time.split(":").map(Number);
    // const startTime = minutes * 60 + seconds;
    // if (videoRef.current) {
    //   const videoSrc = new URL(videoRef.current.src);
    //   videoSrc.searchParams.set("start", startTime);
    //   videoRef.current.src = videoSrc.toString();
    //   videoRef.current.play();
    // }
    const [minutes, seconds] = time.split(":").map(Number);
    const startTime = minutes * 60 + seconds;

    if (videoRef.current) {
      const player = videoRef.current.getInternalPlayer();
      player.seekTo(startTime, true);
      player.playVideo();
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div className="flex ml-14">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <a href="/courses">
                      <ChevronLeft className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                  <p>Back to courses</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
              {/* <iframe
                ref={videoRef}
                src={course.video_link}
                title={course.title}
                className="rounded-lg"
                allow="clipboard-read; clipboard-write"
                allowFullScreen
              ></iframe> */}
              <YouTube
                videoId={course.video_id}
                ref={videoRef}
                className="rounded-lg"
                opts={opts}
                // onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
              />
              ;{/* <YoutubePlayer videoId={"zOjov-2OZ0E"} /> */}
            </div>
            {/* <div className="float-end">
              <button
                onClick={handleQuizClick}
                className="mt-4 bg-slate-800 h-12 w-20 mr-auto rounded-lg text-gray-300 font-bold"
              >
                Quiz
              </button>
            </div> */}
          </div>

          {showModal && (
            <Modal
              title="Quiz"
              visible={showModal}
              onCancel={() => {
                if (isCorrect) {
                  setShowModal(false);
                } else {
                  alert(
                    "You must answer correctly before closing the question."
                  );
                }
              }}
              footer={null}
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
                  <p className="ml-4 text-lg font-medium">Loading...</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4">{quiz.question}</h2>
                  <div className="space-y-2">
                    {["A", "B", "C", "D"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={!!selectedAnswer}
                        className={`p-2 rounded-lg w-full text-left ${
                          selectedAnswer
                            ? option === quiz.answer
                              ? "bg-green-500"
                              : selectedAnswer === option
                              ? "bg-red-500"
                              : "bg-gray-200"
                            : "bg-gray-200"
                        }`}
                      >
                        {option}: {quiz[option]}
                      </button>
                    ))}
                  </div>
                  {isCorrect === false && (
                    <p className="text-red-500 text-center mt-4">
                      Câu trả lời sai, vui lòng thử lại.
                    </p>
                  )}
                  {/* } */}
                  <div className="text-end">
                    <button
                      onClick={handleNextClick}
                      className="bg-gray-600 text-gray-200 mt-8 rounded-md h-10 w-20 "
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </Modal>
          )}

          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-bold mb-2">Lectures</h2>
            <div className="flex flex-col space-y-4 h-[calc(100vh-200px)] overflow-y-auto">
              {course.lectures.map((lecture, index) => (
                <div
                  key={`${lecture.title_lecture}-${index}`}
                  className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold">
                      {lecture.title_lecture}
                    </h3>
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
