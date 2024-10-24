import { CheckCircle, FilmIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../index.css";
import Sidebar from './Sidebar';

const NewCourse = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editNote, setEditNote] = useState('');
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // Track current video time
  const [completedLectures, setCompletedLectures] = useState(0); // Track completed lectures

  // Fetch course details from the backend
  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`http://localhost:5050/course/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Failed to load the course", error);
      }
    }
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course) {
      // Dynamically load the YouTube IFrame API if it isn't already loaded
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Wait for the API to be ready before creating the player
        window.onYouTubeIframeAPIReady = () => {
          createPlayer();
        };
      } else {
        createPlayer(); // If the API is already loaded, create the player
      }
    }

    function createPlayer() {
      const player = new window.YT.Player('youtube-player', {
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onPlayerReady,
        },
      });

      function onPlayerReady(event) {
        setInterval(() => {
          const currentTime = event.target.getCurrentTime();
          setCurrentTime(currentTime);
          updateCompletedLectures(currentTime);
        }, 1000);
      }

      function onPlayerStateChange(event) {
        if (event.data === window.YT.PlayerState.PLAYING) {
          console.log("Video is playing");
        }
      }
    }

    function updateCompletedLectures(currentTime) {
      if (course && course.lectures) {
        const completed = course.lectures.filter((lecture) => {
          const [minutes, seconds] = lecture.time.split(':').map(Number);
          const lectureTimeInSeconds = minutes * 60 + seconds;
          return currentTime >= lectureTimeInSeconds;
        }).length;
        setCompletedLectures(completed); // Update the completed lectures count
      }
    }

  }, [course]);

  const handleSaveNotes = () => {
    if (notes) {
      setSavedNotes([...savedNotes, notes]);
      setNotes('');
    }
  };

  const handleEditNote = (index) => {
    setIsEditing(index);
    setEditNote(savedNotes[index]);
  };

  const handleUpdateNote = () => {
    const updatedNotes = savedNotes.map((note, index) =>
      index === isEditing ? editNote : note
    );
    setSavedNotes(updatedNotes);
    setIsEditing(null);
    setEditNote('');
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };

  if (!course) return <div>Loading....</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />
      <div className="container mr-0 ml-7 flex bg-gradient-to-r from-gray-50 text-black font-sans mt-7 course">
        <div className="flex-grow p-4">
          {/* Video Embed */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              id="youtube-player"
              className="absolute top-0 left-0 w-full h-full"
              src={course.video_link}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info */}
          <div className="mb-4">
            <h2 className="font-bold video-title">{course.title}</h2>
            <div className="video-description">
              <p>Description of the video goes here. This is a brief description of what the video is about.</p>
              <p>
                <strong>Language Used:</strong> {course.language}
              </p>
              <p>
                <strong>Author:</strong> {course.author}
              </p>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mb-4 video-note">
            <textarea
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-600'
              rows="4"
              placeholder="Enter your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <div className='flex justify-end mt-2'>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                onClick={handleSaveNotes}
              >
                Save Notes
              </button>
            </div>
          </div>

          {/* Saved Notes Section */}
          <div id="savedNotes" className="p-4">
            <h3 className="text-lg font-bold mb-4">Saved Notes</h3>
            <div id="notesContent">
              {savedNotes.length > 0 ? (
                savedNotes.map((note, index) => (
                  <div key={index} className="flex mb-4">
                    <div className="flex-grow">
                      <p className="text-sm mb-2">{note}</p>
                      <div className="flex space-x-4">
                        <button
                          className="text-blue-600 text-sm hover:underline"
                          onClick={() => handleEditNote(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 text-sm hover:underline ml-2"
                          onClick={() => handleDeleteNote(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No notes saved yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Completed Missions Section */}
        <div className='w-1/4 mt-3 ml-3'>
          <h1 className="text-lg font-bold mb-4">Course Progress</h1>
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completedLectures / course.lectures.length) * 100}%` }}></div>
            </div>
            <p className="text-sm">Completed Missions: {completedLectures}/{course.lectures.length}</p>
          </div>
          <ul>
            {course.lectures.map((lecture, index) => (
              <li key={index} className="w-full flex justify-between items-center mb-2">
                <div className="flex items-left w-2/3">
                  <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                  <span className="truncate">{lecture.title_lecture}</span>
                </div>
                <div className="flex items-right w-1/3 justify-end">
                  <span className="mr-2">{course.language_short}</span>
                  <i className={`fas fa-check-circle ${completedLectures > index ? 'text-green-500' : 'text-red-500'}`}><CheckCircle /></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
