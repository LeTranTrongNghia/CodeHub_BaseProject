import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/firebase/firebase';

import Sidebar from '@/components/MainHome/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookMarked, Bot, ChevronLeft, CircleUser, Search } from 'lucide-react';

import ReviewCode from './ReviewCode';
import { CODE_SNIPPETS } from './constant/constants';
import LanguageSelector from '/src/components/Code_Editor/LanguageSelector';
import Output from '/src/components/Code_Editor/Output';
import AI from '../AI_chat/AI';
import ProblemDes from '@/components/Code_Editor/ProblemDes';

const CodeEditorWrapper = () => {
	const [value, setValue] = useState('');
	const [language, setLanguage] = useState('');
	const [option, setOption] = useState('1');
	const editorRef = useRef(null);
	const renderProblem = useSelector(state => state.problem.selectedProblem);
	const navigate = useNavigate();
	const [iframeSrc, setIframeSrc] = useState('');
	const [iframeVisible, setIframeVisible] = useState(false); 
	const [isDialogOpen, setIsDialogOpen] = useState(false); 
	const [overlayVisible, setOverlayVisible] = useState(false); // New state for overlay visibility

	useEffect(() => {
		if (editorRef.current) {
			monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
				noSemanticValidation: true,
				noSyntaxValidation: true,
			});
		}
	}, [editorRef]);

	// const handleLogout = async () => {
	// 	try {
	// 		await signOut(auth);
	// 		toast.success('Logout successful');
	// 		navigate('/login');
	// 	} catch (error) {
	// 		console.error('Logout error:', error);
	// 		toast.error('Logout failed');
	// 	}
	// };

	const handleEditorDidMount = (editor) => {
		editorRef.current = editor;
	};

	const languageMapping = {
		python: '311', // Convert Python to 311
		java: 'java',  // Keep Java as is
		javascript: 'js' // Convert JavaScript to js
	};

	const onSelect = (selectedLanguage) => {
		setLanguage(selectedLanguage);
		setValue(CODE_SNIPPETS[selectedLanguage]);
		// No need to set iframeSrc here, it will be set in getCode
	};

	const getCode = () => {
		const code = editorRef.current.getValue();
		const encodedCode = encodeURIComponent(code);
		
		// Count the number of lines in the code
		const lineCount = code.split('\n').length;

		// If there are less than 20 lines, calculate how many %0A to add
		let additionalNewLines = 0;
		if (lineCount < 21) {
			additionalNewLines = 21 - lineCount; // Calculate how many %0A to add
		}

		// Append the necessary %0A to the encodedCode
		const finalEncodedCode = '%0A'.repeat(additionalNewLines) + encodedCode;

		const mappedLanguage = languageMapping[language] || language; // Use mapping or fallback to original
		const tutorUrl = `https://pythontutor.com/render.html#code=${finalEncodedCode}&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&mode=display&py=${mappedLanguage}&rawInputLstJSON=[]&textReferences=false`;
		
		setIframeSrc(tutorUrl);
		setIframeVisible(true);
	};

	const handleIframeLoad = () => {
		const iframe = document.getElementById('tutor-iframe');
		const iframeWindow = iframe.contentWindow;

		// Send a message to the iframe to set the language and trigger visualization
		iframeWindow.postMessage({ language, action: 'visualize' }, '*');
	};

	const handleRunVisualize = () => {
		getCode();
		setIsDialogOpen(true); // Open the dialog
		setOverlayVisible(true); // Show the overlay
		setTimeout(() => {
			setOverlayVisible(false); // Hide the overlay after 3 seconds
		}, 2000);
	};

	return (
		<div className='flex min-h-screen w-full flex-col'>
			{/* Topbar */}
			<header className='flex h-16 items-center gap-4 border-b px-4 md:px-6'>
				<nav className='flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
					<div className='flex ml-14'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='outline' size='icon'>
										<a href='/main-home'>
											<ChevronLeft className='h-4 w-4' />
										</a>
									</Button>
								</TooltipTrigger>
								<TooltipContent side='bottom' sideOffset={5}>
									<p>Back to explore</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type='button'
									className={`option ${option === '1' ? 'selected' : ''} flex bg-white p-3 rounded-md text-left w-[120px]`}
									onClick={() => setOption('1')}
								>
									<BookMarked className='size-5 mr-4' />
									Problem
								</button>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={5}>
								<p>See problem description</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type='button'
									className={`option ${option === '2' ? 'selected' : ''} flex bg-white p-3 rounded-md text-left w-[150px]`}
									onClick={() => setOption('2')}
								>
									<Bot className='size-5 mr-4' />
									AI Assistant
								</button>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={5}>
								<p>Get guide from AI</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</nav>
				<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
					<form className='ml-auto flex-1 sm:flex-initial'>
						<div className='relative hidden'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Search problems...'
								className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
							/>
						</div>
					</form>
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

			{/* Sidebar */}
			<Sidebar />

			{/* Main */}
			<main className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
				{/* ProblemDescription & AI_Chat */}
				<div className=''>
					{option === '1' && (
						<div>
							<ProblemDes problem={renderProblem} />
						</div>
					)}
					{option === '2' && (
						<div>
							<AI problem={renderProblem} />
						</div>
					)}
				</div>

				{/* Editor */}
				<div className='relative flex h-full mt-3 flex-col rounded-xl border border-white p-4 lg:col-span-2'>
					<Badge variant='outline' className='absolute right-3 top-3'>
						Editor
					</Badge>
					<div className='w-full h-full'>
						<div className='flex h-20 items-center justify-between'>
							<LanguageSelector language={language} onSelect={onSelect} />
							<div className='mt-5'>
								<ReviewCode userCode={value} problemText={renderProblem} />
							</div>
						</div>
						<Editor
							height='50vh'
							defaultLanguage={language}
							defaultValue={CODE_SNIPPETS[language]}
							theme='vs-dark'
							onMount={handleEditorDidMount}
							value={value}
							onChange={(newValue) => setValue(newValue)}
						/>
						<Button className='mt-5' onClick={handleRunVisualize}>Run Visualize</Button> {/* Combined button */}
						
						{isDialogOpen && (
							<div
								className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
								style={{ zIndex: 1000 }}
							>
								<div
									className='bg-white pl-5 pr-5 pb-5 rounded-lg'
									style={{ width: '80%', height: '95%' }}
								>
									{/* <h2 className='text-xl font-bold'>Visualization with PythonTutor</h2> */}
									{iframeVisible && (
										<div className='relative flex ml-[100px] justify-center items-center h-[95%] overflow-hidden'> {/* Added overflow-hidden */}
											{overlayVisible && ( // Conditional rendering for the overlay inside the iframe's div
												<div className='absolute inset-0 bg-white w-full h-full z-10' />
											)}
											<div className='absolute inset-y-0 top-0 bg-white w-full h-[30px] z-10' />
											<div className='absolute left-[200px] top-[70px] bg-white w-[160px] h-[15px] z-10' />
											<iframe
												id="tutor-iframe"
												src={iframeSrc}
												width="100%"
												height="99%"
												title="Pythontutor Visualization"
												onLoad={handleIframeLoad}
												sandbox="allow-same-origin allow-scripts"
												className='absolute mb-10'
												style={{ overflowX: 'hidden' }}
												scrolling="no"
											></iframe>
											<div className='absolute inset-y-0 right-0 bg-white w-[250px] z-10' />
											<div className='absolute left-[200px] bottom-[130px] bg-white w-[150px] h-[30px] z-10' />
											<Button className='absolute top-5 right-10 z-10 mb-4' onClick={() => setIsDialogOpen(false)}>Close</Button>
										</div>
									)}
									
								</div>
							</div>
						)}
						<Output editorRef={editorRef} language={language} />
					</div>
				</div>
			</main>
		</div>
	);
}

export default CodeEditorWrapper;
