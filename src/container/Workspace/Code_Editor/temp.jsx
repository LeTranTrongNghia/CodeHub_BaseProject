// import React, { useState, useRef, useEffect } from 'react';
// import Editor from '@monaco-editor/react';
// import * as monaco from 'monaco-editor'; // Import monaco-editor
// import LanguageSelector from "/src/components/Code_Editor/LanguageSelector";
// import Output from "/src/components/Code_Editor/Output";
// import ProblemDescription from "/src/components/Code_Editor/ProblemDescription";
// import AI_chat from "/src/container/Workspace/AI_chat/AI_chat";
// import { CODE_SNIPPETS } from './constant/constants';
// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();
// const [value, setValue] = useState('');
// const [language, setLanguage] = useState('');
// const [option, setOption] = useState('1');
// const editorRef = useRef();

// const onSelect = language => {
//     setLanguage(language);
//     setValue(CODE_SNIPPETS[language]);
// };

// useEffect(() => {
//     if (editorRef.current) {
//         monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
//             noSemanticValidation: true,
//             noSyntaxValidation: true,
//         });
//     }
// }, [editorRef]);

// <div className='flex min-h-screen bg-gray-900 text-gray-400 px-6 py-8'>
//     <div className='w-3/5 bg-gray-800 text-gray-300 p-4 rounded-md mr-4'>
//         <button
//             type='submit'
//             class='bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-4'
//             onClick={() => navigate('/')}
//         >
//             Back to Homepage
//         </button>
//         <button
//             type='submit'
//             className={`option ${option === '1' ? 'selected' : ''} bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-4`}
//             onClick={(e) => setOption('1')}
//         >
//             Code Editor
//         </button>
//         <button
//             type='submit'
//             className={`option ${option === '2' ? 'selected' : ''} bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-4`}
//             onClick={(e) => setOption('2')}
//         >
//             AI Assistant
//         </button>
//         <div>
//             {option === '1' && <div><ProblemDescription /></div>}
//             {option === '2' && <div><AI_chat /></div>}
//         </div>
//     </div>

//     <div className='w-2/5 bg-gray-800 text-gray-300 p-4 rounded-md'>
//         <LanguageSelector language={language} onSelect={onSelect} />
//         <Editor
//             height='58vh'
//             defaultLanguage={language}
//             defaultValue={CODE_SNIPPETS[language]}
//             theme='vs-dark'
//             onMount={editor => {
//                 editorRef.current = editor;
//             }}
//             value={value}
//             onChange={value => setValue(value)}
//         />
//         <Output editorRef={editorRef} language={language} />
//     </div>
// </div>


// {/* <div className="flex-1">
// 					<form
// 						className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
// 					>
// 						<Label htmlFor="message" className="sr-only">
// 							Message
// 						</Label>
// 						<Textarea
// 							id="message"
// 							placeholder="Type your message here..."
// 							className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
// 						/>
// 						<div className="flex items-center p-3 pt-0">
// 							<TooltipProvider>
// 								<Tooltip>
// 									<TooltipTrigger asChild>
// 										<Button variant="ghost" size="icon">
// 											<Paperclip className="size-4" />
// 											<span className="sr-only">Attach file</span>
// 										</Button>
// 									</TooltipTrigger>
// 									<TooltipContent side="top">Attach File</TooltipContent>
// 								</Tooltip>
// 							</TooltipProvider>
// 							<TooltipProvider>
// 								<Tooltip>
// 									<TooltipTrigger asChild>
// 										<Button variant="ghost" size="icon">
// 											<Mic className="size-4" />
// 											<span className="sr-only">Use Microphone</span>
// 										</Button>
// 									</TooltipTrigger>
// 									<TooltipContent side="top">Use Microphone</TooltipContent>
// 								</Tooltip>
// 							</TooltipProvider>
// 							<Button type="submit" size="sm" className="ml-auto gap-1.5">
// 								Send Message
// 								<CornerDownLeft className="size-3.5" />
// 							</Button>
// 						</div>
// 					</form>
// 				</div> */}


// <div className='bg-dark-layer-1'>
//     {/* TAB */}
//     <div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden ml-5'>
//         <div className={"flex-1 mr-2 text-xl text-white font-medium"}>
//             Description
//         </div>
//     </div>

//     <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
//         <div className='px-5'>
//             {/* Problem heading */}
//             <div className='w-full'>
//                 <div className='flex space-x-4'>
//                     <div className='flex-1 mr-2 text-3xl text-white font-medium'>{problem?.title}</div>
//                 </div>

//                 <div className='flex items-center mt-3'>
//                     <div
//                         className='inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-x font-medium capitalize text-green-400 bg-green-100'
//                     >
//                         {problem.difficulty}
//                     </div>
//                     <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
//                         <BsCheck2Circle />
//                     </div>
//                     <div
//                         className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
//                     >
//                         <AiFillLike className='text-dark-blue-s' />
//                         <span className='text-lg'>{problem.likes}</span>
//                     </div>
//                     <div
//                         className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
//                     >
//                         <AiFillDislike className='text-dark-blue-s' />
//                         <span className='text-lg'>{problem.dislikes}</span>
//                     </div>
//                     <div
//                         className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
//                     >
//                         <AiFillStar className='text-dark-yellow' />
//                     </div>
//                 </div>

//                 {/* Problem Statement */}
//                 <div className='text-white text-lg mt-4'>
//                     <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
//                 </div>

//                 {/* Examples */}
//                 <div className='mt-4'>
//                     {problem.examples.map((example, index) => (
//                         <div key={example.id}>
//                             <p className='font-medium text-white text-lg'>Example {index + 1}: </p>
//                             {example.img && <img src={example.img} alt='' className='mt-3' />}
//                             <div className='example-card'>
//                                 <pre className='text-wrap'>
//                                     <strong className='text-white'>Input: </strong> {example.inputText}
//                                     <br />
//                                     <strong className='text-white'>Output: </strong>
//                                     {example.outputText} <br />
//                                     {example.explanation && (
//                                         <>
//                                             <strong className='text-white'>Explanation:</strong> {example.explanation}<br /> {/* Added <br/> tag */}
//                                         </>
//                                     )}
//                                 </pre>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Constraints */}
//                 <div className='my-8 pb-4'>
//                     <div className='text-white text-sm font-medium text-xl'>Constraints:</div>
//                     <ul className='text-white ml-5 list-disc text-lg'>
//                         <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>



// return (
//     <>
//         <form onSubmit={generateAnswer} className='text-center'>
//             <h1 class='text-3xl text-center mb-4 mt-4'>Gemini AI</h1>
//             <div className="h-200 overflow-auto mb-4">  <ReactMarkdown className="p-3 prose max-w-prose mx-auto">
//                 {answer}
//             </ReactMarkdown>
//             </div>
//             <textarea
//                 required
//                 className='border rounded w-full min-h-fit p-3 bg-gray-800 text-gray-300'
//                 value={question}
//                 onChange={e => setQuestion(e.target.value)}
//                 placeholder='Enter a promt here'
//                 style={{ height: '200px' }}
//             ></textarea>
//             <div className='flex justify-center mt-2'>
//                 <button
//                     type='submit'
//                     className='bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white'
//                     disabled={generatingAnswer}
//                 >
//                     Analyze Promt
//                 </button>
//                 <button
//                     type='button'
//                     onClick={guideCode}
//                     className='bg-blue-300 p-3 rounded-md hover:bg-green-400 transition-all duration-300 mx-2text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-2'
//                     disabled={generatingAnswer}
//                 >
//                     Guide Code
//                 </button>
//             </div>
//         </form>
//     </>
// );

import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Bot } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

function AI_chat() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [generatingAnswer, setGeneratingAnswer] = useState(false);
	const problemText = `Write a function that takes a string as input and returns a new string with the characters reversed. 
  For example, if the input is "hello", the output should be "olleh".`;
	// const userCode = 'console.log("olleh");';

	async function generateAnswer(e) {
		setGeneratingAnswer(true);
		e.preventDefault();

		setAnswer('Gemini is thinking... \n It might take upto 10 seconds.');
		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
					}`,
				method: 'post',
				data: {
					contents: [{ parts: [{ text: question }] }],
				},
			});

			// Update answer with the actual review from the API response
			setAnswer(
				response['data']['candidates'][0]['content']['parts'][0]['text'],
			);
		} catch (error) {
			console.log(error);
			setAnswer('Sorry - Something went wrong. Please try again!');
		}

		setGeneratingAnswer(false);
	}

	async function guideCode() {
		setGeneratingAnswer(true);
		setAnswer('Generating guide... \n It might take upto 10 seconds.');

		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
					}`,
				method: 'post',
				data: {
					contents: [
						{
							parts: [
								{
									text:
										'Imagine you are a professor majoring in Information Technology. Teach me how to write functions' +
										problemText +
										"Show me ideas and step-by-step instructions to help me find a way to solve a code problem. Don't write out hint code or example code, let me write it myself.",
								},
							],
						},
					],
				},
			});

			const guide =
				response['data']['candidates'][0]['content']['parts'][0]['text'];
			setAnswer(guide);
		} catch (error) {
			console.log(error);
			setAnswer("Sorry - Couldn't generate guide at this time.");
		}

		setGeneratingAnswer(false);
	}

	return <div
		className="relative hidden flex-col items-start gap-8 md:flex ml-14 text-white" x-chunk="dashboard-03-chunk-0"
	>
		<form className="grid w-full items-start gap-6">
			<fieldset className="grid gap-6 rounded-lg border p-4">
				<legend className="-ml-1 px-1 text-lg font-medium">
					AI Assistant
				</legend>
				<div class="flex justify-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button className='flex justify-center items-center w-[80px] h-[80px] bg-white rounded-md'>
									<Bot className="size-16 text-black" />
								</button>
							</TooltipTrigger>
							<TooltipContent side="bottom" sideOffset={5}>
								<p className='font-medium'>Hello, I'm CodeHub - your personal AI assistant!</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<form onSubmit={generateAnswer} className='text-center max-h-[470px] overflow-auto'>
					<div className="overflow-auto max-w-[450px] text-left">
						<ReactMarkdown className="mx-auto">
							{answer}
						</ReactMarkdown>
					</div>
					<textarea
						required
						className="h-fit w-full text-black mt-3 overflow-y-auto p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
						value={question}
						onChange={e => setQuestion(e.target.value)}
						placeholder="Enter a prompt here"
					></textarea>
				</form>
				<div className='flex justify-center mr-2'>
					<button
						type='submit'
						className='bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white'
						disabled={generatingAnswer}
					>
						Analyze Promt
					</button>
					<button
						type='button'
						onClick={guideCode}
						className='bg-blue-300 p-3 rounded-md hover:bg-green-400 transition-all duration-300 mx-2text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-2'
						disabled={generatingAnswer}
					>
						Guide Code
					</button>
				</div>
			</fieldset>
		</form>
	</div>
}

export default AI_chat;