import { CheckCircle, FilmIcon } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';

const NewCourse = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Trạng thái theo dõi ghi chú đang chỉnh sửa
  const [editNote, setEditNote] = useState(''); // Nội dung ghi chú đang chỉnh sửa

  const handleSaveNotes = () => {
    if (notes) {
      setSavedNotes([...savedNotes, notes]); // Thêm ghi chú mới vào danh sách
      setNotes(''); // Xóa nội dung trong input sau khi lưu
    }
  };

  const handleEditNote = (index) => {
    setIsEditing(index); // Đặt trạng thái chỉnh sửa
    setEditNote(savedNotes[index]); // Đặt giá trị ghi chú cần chỉnh sửa vào input
  };

  const handleUpdateNote = () => {
    const updatedNotes = savedNotes.map((note, index) =>
      index === isEditing ? editNote : note
    );
    setSavedNotes(updatedNotes);
    setIsEditing(null); // Thoát khỏi chế độ chỉnh sửa
    setEditNote(''); // Xóa nội dung sau khi cập nhật
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Sidebar/>
    <div className="container mr-0 flex bg-gradient-to-r from-gray-50 text-black font-sans mt-7">
      <div className="flex-grow p-4">
        {/* Video Embed */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/abPmZCZZrFA?si=Y3loNO1V_3zG3Koy"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">Video Title</h2>
          <p className="text-sm">
            Description of the video goes here. This is a brief description of what the video is about.
          </p>
          <p className="text-sm">
            <strong>Language Used:</strong> JavaScript, React
          </p>
          <p className="text-sm">
            <strong>Author:</strong> Author Name
          </p>
        </div>

        {/* Notes Section */}
        <div className="mb-4">
          <textarea
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
            rows="4"
            placeholder="Enter your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)} // Cập nhật ghi chú khi nhập
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 rounded-lg"
            onClick={handleSaveNotes} // Lưu ghi chú khi bấm
          >
            Save Notes
          </button>
        </div>

        {/* Saved Notes Section */}
        <div id="savedNotes" className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Saved Notes</h3>
          <div id="notesContent" className="text-sm">
            {savedNotes.length > 0 ? (
              savedNotes.map((note, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  {isEditing === index ? (
                    // Hiển thị input nếu đang chỉnh sửa
                    <div className="flex-grow">
                      <input
                        className="w-full p-2 bg-gray-500 rounded-lg text-white"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                      />
                      <button
                        className="mt-2 px-4 py-2 bg-green-600 rounded-lg"
                        onClick={handleUpdateNote} // Cập nhật ghi chú khi bấm
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{note}</span>
                      <div className="relative flex space-x-2">
                        <button
                          className="text-gray-400 hover:text-gray-200 focus:outline-none"
                          onClick={() => handleEditNote(index)} // Kích hoạt chế độ chỉnh sửa
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-200 focus:outline-none"
                          onClick={() => handleDeleteNote(index)} // Xóa ghi chú
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No notes saved yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className='w-1/4 mt-3 ml-3'>
        <h1 className="text-lg font-bold mb-4">Tên khóa học</h1>
        <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <p className="text-sm">Completed Missions: 2/6</p>
        </div>
        <ul>
        <li className="w-full flex justify-between items-center mb-2">
            <div className="flex items-left w-2/3">
                <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                <span className="truncate">Tên phần học</span> 
            </div>
            <div className="flex items-right w-1/3 justify-end">
                <span className="mr-2">PY</span>
                <i className="fas fa-check-circle text-green-500"><CheckCircle /></i>
            </div>
            </li>

            <li className="w-full flex justify-between items-center mb-2">
            <div className="flex items-left w-2/3">
                <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                <span className="truncate">Tên phần học</span> 
            </div>
            <div className="flex items-right w-1/3 justify-end">
                <span className="mr-2">PY</span>
                <i className="fas fa-check-circle text-green-500"><CheckCircle /></i>
            </div>
            </li>

            <li className="w-full flex justify-between items-center mb-2">
            <div className="flex items-left w-2/3">
                <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                <span className="truncate">Tên phần học</span> 
            </div>
            <div className="flex items-right w-1/3 justify-end">
                <span className="mr-2">PY</span>
                <i className="fas fa-check-circle text-red-500"><CheckCircle /></i>
            </div>
            </li>
            <li className="w-full flex justify-between items-center mb-2">
            <div className="flex items-left w-2/3">
                <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                <span className="truncate">Tên phần học</span> 
            </div>
            <div className="flex items-right w-1/3 justify-end">
                <span className="mr-2">PY</span>
                <i className="fas fa-check-circle text-red-500"><CheckCircle /></i>
            </div>
            </li>
            <li className="w-full flex justify-between items-center mb-2">
            <div className="flex items-left w-2/3">
                <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                <span className="truncate">Tên phần học</span> 
            </div>
            <div className="flex items-right w-1/3 justify-end">
                <span className="mr-2">PY</span>
                <i className="fas fa-check-circle text-red-500"><CheckCircle /></i>
            </div>
            </li>
            <li className="w-full flex justify-between items-center mb-2">
            <div className="flex items-left w-2/3">
                <i className="fas fa-film text-yellow-500 mr-2"><FilmIcon /></i>
                <span className="truncate">Tên phần học</span> 
            </div>
            <div className="flex items-right w-1/3 justify-end">
                <span className="mr-2">PY</span>
                <i className="fas fa-check-circle text-red-500"><CheckCircle /></i>
            </div>
            </li>
            

            
        </ul>
    </div>
    </div>
    </div>
  );
};

export default NewCourse;
