// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUploadAndDisplay = () => {
//     const [files, setFiles] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [generatingAnswer, setGeneratingAnswer] = useState(false);

//     const readFileContent = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
//             reader.onerror = (error) => reject(error);
//             reader.readAsText(file);
//         });
//     };

//     const handleFileChange = async (event) => {
//         const uploadedFiles = Array.from(event.target.files);
//         const fileContents = await Promise.all(uploadedFiles.map(readFileContent));
//         setFiles(fileContents);
//         setSelectedFile(null);
//     };

//     const handleFileSelect = (file) => {
//         setSelectedFile(file);
//     };

//     const generateAnswer = async (e) => {
//         e.preventDefault();
//         setGeneratingAnswer(true);
//         setAnswer('Gemini is thinking... \nIt might take up to 10 seconds.');

//         try {
//             const response = await axios({
//                 url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
//                 method: 'post',
//                 data: {
//                     contents: [
//                         {
//                             parts: [
//                                 {
//                                     text: `Analyze the following file contents and answer the question:\n\n${files.map(file => `${file.name}:\n${file.content}\n\n`).join('')}\nQuestion: ${question}`,
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             });

//             setAnswer(response.data.candidates[0].content.parts[0].text);
//         } catch (error) {
//             console.log(error);
//             setAnswer('Sorry - Something went wrong. Please try again!');
//         }

//         setGeneratingAnswer(false);
//     };

//     return (
//         <div className="flex h-screen font-sans overflow-hidden">
//             <div className="w-1/2 p-6 bg-gray-100 flex flex-col">
//                 <h2 className="text-2xl font-bold mb-4">Upload Files</h2>
//                 <input
//                     type="file"
//                     onChange={handleFileChange}
//                     multiple
//                     accept=".txt,.doc,.docx,.pdf,.py,.java,.js,.html,.css"
//                     className="w-full p-2 mb-4 border border-gray-300 rounded"
//                 />
//                 <div className="mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
//                     <ul className="bg-white rounded border border-gray-300 p-2">
//                         {files.map((file, index) => (
//                             <li
//                                 key={index}
//                                 className={`cursor-pointer p-2 hover:bg-gray-200 ${selectedFile === file ? 'bg-blue-100' : ''}`}
//                                 onClick={() => handleFileSelect(file)}
//                             >
//                                 {file.name}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="flex-grow overflow-auto mb-4">
//                     {selectedFile && (
//                         <div>
//                             <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
//                             <pre className="bg-gray-200 p-2 rounded whitespace-pre-wrap break-words max-h-60 overflow-auto">
//                                 {selectedFile.content}
//                             </pre>
//                         </div>
//                     )}
//                 </div>
//                 <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
//                 <textarea
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="w-full p-2 mb-4 border border-gray-300 rounded"
//                     rows="4"
//                     placeholder="Type your question here..."
//                 />
//                 <button
//                     onClick={generateAnswer}
//                     disabled={generatingAnswer}
//                     className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//                 >
//                     {generatingAnswer ? 'Generating...' : 'Generate Answer'}
//                 </button>
//             </div>
//             <div className="w-1/2 p-6 bg-white overflow-y-auto">
//                 <h2 className="text-2xl font-bold mb-4">Generated Answer</h2>
//                 {answer ? (
//                     <div className="bg-gray-100 p-4 rounded max-h-[calc(100vh-8rem)] overflow-auto">
//                         <pre className="whitespace-pre-wrap break-words">{answer}</pre>
//                     </div>
//                 ) : (
//                     <p className="text-gray-500">The answer will appear here after generation.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FileUploadAndDisplay;

import React, { useState } from 'react';
import axios from 'axios';

const FileUploadAndDisplay = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [error, setError] = useState('');

    // Disallowed file extensions
    const disallowedExtensions = [
        '.doc', '.docx', '.pdf', '.ppt', '.pptx',
        '.mp3', '.wav', '.ogg', '.mp4', '.avi', '.mov', '.wmv'
    ];

    const isAllowedFile = (file) => {
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        return !disallowedExtensions.includes(extension);
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    const handleFileChange = async (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setError('');

        // Filter out disallowed file types
        const allowedFiles = uploadedFiles.filter(isAllowedFile);

        if (allowedFiles.length !== uploadedFiles.length) {
            setError('Only Code files allowed!');
        }

        if (allowedFiles.length > 0) {
            const fileContents = await Promise.all(allowedFiles.map(readFileContent));
            setFiles(fileContents);
            setSelectedFile(null);
        }
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const generateAnswer = async (e) => {
        e.preventDefault();
        setGeneratingAnswer(true);
        setAnswer('Gemini is thinking... \nIt might take up to 10 seconds.');

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                method: 'post',
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Imagine you are an AI coding assistant named CodeHub. Analyze the following file contents and answer the question:\n\n${files.map(file => `${file.name}:\n${file.content}\n\n`).join('')}\nQuestion: ${question}`,
                                },
                            ],
                        },
                    ],
                },
            });

            setAnswer(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.log(error);
            setAnswer('Sorry - Something went wrong. Please try again!');
        }

        setGeneratingAnswer(false);
    };

    return (
        <div className="flex h-screen font-sans overflow-hidden">
            <div className="w-1/2 p-6 bg-gray-100 flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Upload Files</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
                    <ul className="bg-white rounded border border-gray-300 p-2">
                        {files.map((file, index) => (
                            <li
                                key={index}
                                className={`cursor-pointer p-2 hover:bg-gray-200 ${selectedFile === file ? 'bg-blue-100' : ''}`}
                                onClick={() => handleFileSelect(file)}
                            >
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-grow overflow-auto mb-4">
                    {selectedFile && (
                        <div>
                            <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                            <pre className="bg-gray-200 p-2 rounded whitespace-pre-wrap break-words max-h-60 overflow-auto">
                                {selectedFile.content}
                            </pre>
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    rows="4"
                    placeholder="Type your question here..."
                />
                <button
                    onClick={generateAnswer}
                    disabled={generatingAnswer}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {generatingAnswer ? 'Generating...' : 'Generate Answer'}
                </button>
            </div>
            <div className="w-1/2 p-6 bg-white overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Generated Answer</h2>
                {answer ? (
                    <div className="bg-gray-100 p-4 rounded max-h-[calc(100vh-8rem)] overflow-auto">
                        <pre className="whitespace-pre-wrap break-words">{answer}</pre>
                    </div>
                ) : (
                    <p className="text-gray-500">The answer will appear here after generation.</p>
                )}
            </div>
        </div>
    );
};

export default FileUploadAndDisplay;