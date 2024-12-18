import {
	Bird,
	CornerDownLeft,
	Paperclip,
	Rabbit,
	Settings,
	Turtle,
	Clipboard,
	RotateCw,
	Github,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
	TooltipProvider,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { CODE_SNIPPETS } from '@/container/Workspace/Code_Editor/constant/constants';
import { executeCode } from '/src/container/Workspace/Code_Editor/constant/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Sidebar from '../../components/MainHome/Sidebar';
import Config from './components/Config';

const FileUploadAndDisplay = () => {
	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const [question, setQuestion] = useState('');
	const [chatHistory, setChatHistory] = useState([]);
	const [generatingAnswer, setGeneratingAnswer] = useState(false);
	const [error, setError] = useState('');
	const [fileTree, setFileTree] = useState([]);

	const fileInputRef = React.useRef(null);

	// Disallowed file extensions
	const disallowedExtensions = [
		'.doc',
		'.docx',
		'.pdf',
		'.ppt',
		'.pptx',
		'.txt',
		'.mp3',
		'.wav',
		'.ogg',
		'.mp4',
		'.avi',
		'.mov',
		'.wmv',
	];

	const isAllowedFile = file => {
		const extension = '.' + file.name.split('.').pop().toLowerCase();
		return !disallowedExtensions.includes(extension);
	};

	const readFileContent = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = event =>
				resolve({ name: file.name, content: event.target.result });
			reader.onerror = error => reject(error);
			reader.readAsText(file);
		});
	};

	const handleFileChange = async event => {
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

			// Create file tree structure
			const tree = createFileTree(allowedFiles);
			setFileTree(tree);
		}
	};

	const createFileTree = files => {
		const tree = [];
		const paths = {};

		// First, collect all paths and their file names
		files.forEach(file => {
			const path = file.webkitRelativePath || file.name;
			paths[path] = file;
		});

		// Then build the tree structure
		Object.keys(paths).forEach(path => {
			const parts = path.split('/');
			let currentLevel = tree;

			parts.forEach((part, index) => {
				const isLast = index === parts.length - 1;
				const existing = currentLevel.find(item => 
					Array.isArray(item) ? item[0] === part : item === part
				);

				if (!existing) {
					if (isLast) {
						// It's a file
						currentLevel.push(part);
					} else {
						// It's a directory
						const newFolder = [part, []];
						currentLevel.push(newFolder);
						currentLevel = newFolder[1];
					}
				} else if (Array.isArray(existing)) {
					// Navigate into existing directory
					currentLevel = existing[1];
				}
			});
		});

		return tree;
	};

	const handleFileSelect = fileName => {
		const file = files.find(f => f.name === fileName);
		if (file) {
			setSelectedFile(file);
			setValue(file.content);

			// Determine the file extension and set the language accordingly
			const extension = file.name.split('.').pop().toLowerCase();
			const languageMap = {
				py: 'python',
				js: 'javascript',
				ts: 'typescript',
				java: 'java',
				cs: 'csharp',
				php: 'php',
			};
			setLanguage(languageMap[extension] || 'unknown');
		}
	};

	useEffect(() => {
		const requestRating = async () => {
			if (!selectedFile) {
				console.log('No file selected.');
				return;
			}

			setGeneratingAnswer(true);
			console.log('Requesting rating for:', selectedFile.name);

			try {
				const response = await axios({
					url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
						import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
					}`,
					method: 'post',
					data: {
						contents: [
							{
								parts: [
									{
										text: `Rate the following code on a scale from 1 to 100 for the following criteria:\n\nCorrectness\nPerformance\nClarity\nGive me the answer of numbers in order only, for example: 90\n70\n80\n.\n\nCode:\n${selectedFile.content}`,
									},
								],
							},
						],
					},
				});

				const ratingsText =
					response.data.candidates[0]?.content?.parts[0]?.text?.trim();
				if (ratingsText) {
					const ratings = ratingsText.split('\n');
					if (ratings.length === 3) {
						setCorrectnessRating(Number(ratings[0]));
						setPerformanceRating(Number(ratings[1]));
						setClarityRating(Number(ratings[2]));
						console.log('Ratings received:');
						console.log('Correctness:', ratings[0]);
						console.log('Performance:', ratings[1]);
						console.log('Clarity:', ratings[2]);

						// Add delay before updating chart data
						await new Promise(resolve => setTimeout(resolve, 300)); // 1000 ms = 1 second

						// Update chart data after delay
						setData([
							{
								activity: 'Correctness',
								value: Number(ratings[0]),
								fill: 'var(--color-Correctness)',
							},
							{
								activity: 'Performance',
								value: Number(ratings[1]),
								fill: 'var(--color-Performance)',
							},
							{
								activity: 'Clarity',
								value: Number(ratings[2]),
								fill: 'var(--color-Clarity)',
							},
						]);
					} else {
						console.log('Unexpected response format:', ratingsText);
					}
				} else {
					console.log(
						'Response data is missing expected fields:',
						response.data,
					);
				}
			} catch (error) {
				console.log('Error while requesting ratings:', error);
			} finally {
				setGeneratingAnswer(false);
			}
		};

		if (selectedFile) {
			requestRating();
		}
	}, [selectedFile]);

	const generateAnswer = async e => {
		e.preventDefault();
		setGeneratingAnswer(true);
		setChatHistory([...chatHistory, { type: 'question', text: question }]);

		let promptPrefix = '';

		switch (selectedModel) {
			case 'syntax':
				promptPrefix =
					'Pretending you are a Code Syntax and Debugging Expert named Genesis.';
				break;
			case 'algorithm':
				promptPrefix =
					'Pretending you are an Algorithm and Data Structure Master named Explorer.';
				break;
			case 'quality':
				promptPrefix =
					'Pretending you are a Code Quality and Collaboration Mentor named Quantum.';
				break;
			default:
				promptPrefix =
					'Pretending you are an AI coding assistant named DevLab.';
				break;
		}

		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
					import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
				}`,
				method: 'post',
				data: {
					contents: [
						{
							parts: [
								{
									text: `${promptPrefix} Analyze the following file contents and answer the question:\n\n${files
										.map(file => `${file.name}:\n${file.content}\n\n`)
										.join('')}\nQuestion: ${question}`,
								},
							],
						},
					],
				},
			});

			const answerText = response.data.candidates[0].content.parts[0].text;
			const formattedAnswerText = formatAnswerText(answerText);
			const containsCode = /<code>([\s\S]*?)<\/code>/.test(answerText);

			setChatHistory([
				...chatHistory,
				{ type: 'question', text: question },
				{ type: 'answer', text: formattedAnswerText, containsCode },
			]);
		} catch (error) {
			console.log(error);
			setChatHistory([
				...chatHistory,
				{ type: 'question', text: question },
				{
					type: 'answer',
					text: 'Sorry - Something went wrong. Please try again!',
					containsCode: false,
				},
			]);
		}

		setGeneratingAnswer(false);
		setQuestion('');
	};

	const formatAnswerText = text => {
		// Replace newlines with <br /> tags for proper formatting in HTML
		return text
			.replace(
				/Code:\n([\s\S]*?)(?=<br \/>)?/g,
				'<pre class="bg-gray-200 p-2 rounded">$1</pre>',
			) // Handle code blocks
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Handle bold text
	};

	const extractLanguageAndCode = text => {
		const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/;
		const match = text.match(codeBlockRegex);
		if (match) {
			return { language: match[1], code: match[2] };
		}
		return { language: null, code: text };
	};

	const requestRating = async () => {
		if (!selectedFile) {
			console.log('No file selected.');
			return;
		}

		setGeneratingAnswer(true);
		console.log('Requesting rating for:', selectedFile.name);

		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
					import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
				}`,
				method: 'post',
				data: {
					contents: [
						{
							parts: [
								{
									text: `Rate the following code on a scale from 1 to 100 for the following criteria:\n\nCorrectness\nPerformance\nClarity\nGive me the answer of numbers in order only, for example: 90\n70\n80\n.\n\nCode:\n${selectedFile.content}`,
								},
							],
						},
					],
				},
			});

			// Ensure response data structure is as expected
			const ratingsText =
				response.data.candidates[0]?.content?.parts[0]?.text?.trim();
			if (ratingsText) {
				const ratings = ratingsText.split('\n');
				if (ratings.length === 3) {
					setCorrectnessRating(ratings[0]);
					setPerformanceRating(ratings[1]);
					setClarityRating(ratings[2]);
					console.log('Ratings received:');
					console.log('Correctness:', ratings[0]);
					console.log('Performance:', ratings[1]);
					console.log('Clarity:', ratings[2]);
				} else {
					console.log('Unexpected response format:', ratingsText);
				}
			} else {
				console.log('Response data is missing expected fields:', response.data);
			}
		} catch (error) {
			console.log('Error while requesting ratings:', error);
		} finally {
			setGeneratingAnswer(false);
		}
	};

	const reviewMyCode = async () => {
		if (!selectedFile) {
			console.log('No file selected.');
			return '';
		}

		setGeneratingAnswer(true);
		setChatHistory(prevChatHistory => [
			...prevChatHistory,
			{ type: 'question', text: 'Review my current selected file in details.' },
		]);

		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
					import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
				}`,
				method: 'post',
				data: {
					contents: [
						{
							parts: [
								{
									text: `Imagine you are an AI coding assistant named DevLab. Analyze the following file contents and provide a detailed review based on these categories:\n\nSyntax analysis\nFunction definition check\nLogic analysis\nEfficiency\nReadability.\n\nGive me a detailed review for each category. Answer in this format. Keep it brief and concise, short and simple:\n\nSyntax analysis: ...\nFunction definition check: ...\nLogic analysis: ...\nEfficiency: ...\nReadability: ...\nRecommendations: ...\n\nCode:\n${selectedFile.content}`,
								},
							],
						},
					],
				},
			});

			let reviewText = response.data.candidates[0].content.parts[0].text;

			// Format the review text
			reviewText = formatReviewText(reviewText);

			setChatHistory(prevChatHistory => [
				...prevChatHistory,
				{ type: 'answer', text: reviewText, containsCode: false, isHtml: true },
			]);

			setGeneratingAnswer(false);
			return reviewText;
		} catch (error) {
			console.log(error);
			setChatHistory(prevChatHistory => [
				...prevChatHistory,
				{
					type: 'answer',
					text: 'Sorry - Something went wrong. Please try again!',
					containsCode: false,
				},
			]);

			setGeneratingAnswer(false);
			return '';
		}
	};

	const formatReviewText = text => {
		// Replace newlines with <br /> for HTML rendering
		// Handle code blocks, sections, and bold text
		return text
			.replace(/\n/g, '<br />') // Replace newlines with <br />
			.replace(
				/Code:\n([\s\S]*?)(?=<br \/>)?/g,
				'<pre class="bg-gray-200 p-2 rounded">$1</pre>',
			) // Handle code blocks
			.replace(
				/(\b(?:Syntax analysis|Function definition check|Logic analysis|Efficiency|Readability|Recommendations):\s*[\s\S]*?)(?=<br \/>)?/g,
				'<div class="mb-2 font-bold">$1</div>',
			) // Handle sections
			.replace(/\*\*(.*?)\*\*/g, '<div class="mb-2 font-bold">$1</div>'); // Handle bold text
	};

	const [data, setData] = useState([]);
	const [correctnessRating, setCorrectnessRating] = useState(0);
	const [performanceRating, setPerformanceRating] = useState(0);
	const [clarityRating, setClarityRating] = useState(0);

	const [selectedModel, setSelectedModel] = useState('');

	const [value, setValue] = useState('');
	const [language, setLanguage] = useState('');
	const editorRef = useRef(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;

		setIsLoading(true);
		setErrorMessage(null);

		try {
			const { run: result } = await executeCode(language, sourceCode);
			const userOutput = result.output.split('\n');
			setOutput(userOutput);
		} catch (error) {
			console.error(error);
			setIsError(true);
			setErrorMessage('An error occurred while running your code.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='grid h-screen w-full pl-[56px]'>
			<Sidebar />
			<div className='flex flex-col'>
				<header className='sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4'>
					<h1 className='text-xl font-semibold'>Playground</h1>
					<Drawer>
						<DrawerTrigger asChild>
							<Button variant='ghost' size='icon' className='md:hidden'>
								<Settings className='size-4' />
								<span className='sr-only'>Settings</span>
							</Button>
						</DrawerTrigger>
						<DrawerContent className='max-h-[80vh] hidden'>
							<DrawerHeader>
								<DrawerTitle>Configuration</DrawerTitle>
								<DrawerDescription>
									Configure the settings for the model and messages.
								</DrawerDescription>
							</DrawerHeader>
							<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0'>
								<fieldset className='grid gap-6 rounded-lg border p-4'>
									<legend className='-ml-1 px-1 text-sm font-medium'>
										Settings
									</legend>
									<div className='grid gap-3'>
										<Label htmlFor='model'>Model</Label>
										<Select>
											<SelectTrigger
												id='model'
												className='items-start [&_[data-description]]:hidden'
											>
												<SelectValue placeholder='Select a model' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='genesis'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<Rabbit className='size-5' />
														<div className='grid gap-0.5'>
															<p>
																Neural{' '}
																<span className='font-medium text-foreground'>
																	Genesis
																</span>
															</p>
															<p className='text-xs' data-description>
																Our fastest model for general use cases.
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value='explorer'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<Bird className='size-5' />
														<div className='grid gap-0.5'>
															<p>
																Neural{' '}
																<span className='font-medium text-foreground'>
																	Explorer
																</span>
															</p>
															<p className='text-xs' data-description>
																Performance and speed for efficiency.
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value='quantum'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<Turtle className='size-5' />
														<div className='grid gap-0.5'>
															<p>
																Neural{' '}
																<span className='font-medium text-foreground'>
																	Quantum
																</span>
															</p>
															<p className='text-xs' data-description>
																The most powerful model for complex
																computations.
															</p>
														</div>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className='grid gap-3'>
										<Label htmlFor='file'>Upload your code files</Label>
										<Input id='file' type='file' />
									</div>
								</fieldset>
								<fieldset className='grid gap-6 rounded-lg border p-4'>
									<legend className='-ml-1 px-1 text-sm font-medium'>
										Messages
									</legend>
									<div className='grid gap-3'>
										<Label htmlFor='role'>Role</Label>
										<Select defaultValue='system'>
											<SelectTrigger>
												<SelectValue placeholder='Select a role' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='system'>System</SelectItem>
												<SelectItem value='user'>User</SelectItem>
												<SelectItem value='assistant'>Assistant</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className='grid gap-3'>
										<Label htmlFor='content'>Content</Label>
										<Textarea id='content' placeholder='You are a...' />
									</div>
								</fieldset>
							</form>
						</DrawerContent>
					</Drawer>
					<Button
						variant='outline'
						size='sm'
						className='ml-auto gap-1.5 text-sm'
					>
						<Github className='size-3.5' />
						<a href='https://github.com/LeTranTrongNghia/CodeHub_BaseProject.git'>
							Learn more
						</a>
					</Button>
				</header>
				<main
					className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-3'
					style={{ gridTemplateColumns: '20rem 1fr 0.5fr' }}
				>
					<Config 
						selectedModel={selectedModel}
						setSelectedModel={setSelectedModel}
						handleFileChange={handleFileChange}
						fileInputRef={fileInputRef}
						selectedFile={selectedFile}
						handleFileSelect={handleFileSelect}
						files={files}
						requestRating={requestRating}
						generatingAnswer={generatingAnswer}
						correctnessRating={correctnessRating}
						performanceRating={performanceRating}
						clarityRating={clarityRating}
						data={data}
						fileTree={fileTree}
					/>

					{/* Editor - Now wider */}
					<div className='relative flex h-full min-h-[50vh] flex-col rounded-xl border mt-2 p-4 flex-1'>
						<Badge variant='outline' className='absolute right-3 top-3'>
							Editor
						</Badge>
						<div className='flex-1 overflow-auto p-4 mt-4 mb-4'>
							<div className='w-full h-full'>
								<Editor
									height='60vh'
									defaultLanguage={language}
									defaultValue={CODE_SNIPPETS[language]}
									theme='vs-dark'
									onMount={editor => {
										editorRef.current = editor;
									}}
									value={value}
									onChange={newValue => setValue(newValue)}
								/>
								<div className='flex flex-col w-full mt-4'>
									<div className='flex justify-between items-center mb-4'>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Button
														className='bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-green-700 transition-all duration-300'
														onClick={runCode}
													>
														Run Code
													</Button>
												</TooltipTrigger>
												<TooltipContent side="right">
													Run code function will only execute code in the current file, it can't run the whole project.
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									{isError && (
										<div className='text-red-500 text-sm mb-2'>
											{errorMessage}
										</div>
									)}

									<div
										className={`h-full p-2 rounded-md border-gray-300 border ${
											isError ? 'border-red-500 text-red-400' : ''
										}`}
									>
										{isLoading ? (
											<div className='text-center mt-2'>
												<i className='fas fa-spinner fa-spin'></i> Running
												code...
											</div>
										) : output ? (
											output.map((line, i) => (
												<div key={i} className='text-sm'>
													{line}
												</div>
											))
										) : (
											// eslint-disable-next-line react/no-unescaped-entities
											<div>Click "Run Code" to see the output here</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* AI Chat - Now narrower */}
					<div className='relative flex h-full min-h-[50vh] flex-col rounded-xl border mt-2 p-4 flex-1'>
						<Badge variant='outline' className='absolute right-3 top-3'>
							Output
						</Badge>
						<div className='flex-1 overflow-auto p-4 mt-4 mb-4 max-h-[32rem]'>
							{chatHistory.map((chat, index) => {
								if (chat.type === 'message') {
									return (
										<div
											key={index}
											className='mb-4 rounded-lg p-2 bg-blue-200 text-right'
										>
											{chat.text}
										</div>
									);
								}

								const { language, code } = extractLanguageAndCode(chat.text);
								return (
									<div
										key={index}
										className={`mb-4 rounded-lg p-2 ${
											chat.type === 'question'
												? 'bg-blue-100 text-right'
												: 'bg-gray-100'
										}`}
									>
										{language ? (
											<div className='relative bg-gray-100 p-4 rounded-lg overflow-x-auto'>
												<SyntaxHighlighter
													language={language}
													style={coy}
													customStyle={{ overflowY: 'auto', maxWidth: '27rem' }}
												>
													{code}
												</SyntaxHighlighter>
												<Button
													className='absolute top-2 right-2 p-1 bg-blue-700 text-white rounded'
													onClick={() => navigator.clipboard.writeText(code)}
												>
													<Clipboard className='size-4 mx-2' />
												</Button>
											</div>
										) : (
											<div
												dangerouslySetInnerHTML={{ __html: chat.text }}
												className='whitespace-pre-line' // Ensure formatting preserves newlines
											/>
										)}
									</div>
								);
							})}
						</div>

						<form
							onSubmit={generateAnswer}
							className='relative overflow-hidden'
						>
							<Label htmlFor='message' className='sr-only'>
								Message
							</Label>

							<Textarea
								id='message'
								placeholder='Type your message here...'
								value={question}
								onChange={e => setQuestion(e.target.value)}
								className='min-h-12 resize-none p-3 focus-visible:ring-0'
							/>
							<div className='flex items-center pt-3'>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant='ghost'
												size='icon'
												onClick={event => {
													event.preventDefault(); // Prevent form submission
													fileInputRef.current.click(); // Trigger the file input click
												}}
											>
												<Paperclip className='size-4' />
												<span className='sr-only'>Attach file</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent side='top'>Attach File</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<Button
									type='button'
									size='sm'
									className='ml-2 bg-white text-black border hover:bg-gray-100 rounded p-1'
									onClick={reviewMyCode}
									disabled={generatingAnswer}
								>
									Review Details
								</Button>
								<Button
									type='submit'
									size='sm'
									className='ml-auto gap-1.5'
									disabled={generatingAnswer}
								>
									{generatingAnswer ? 'Generating...' : 'Send Message'}
									<CornerDownLeft className='size-3.5' />
								</Button>
							</div>
						</form>
					</div>
				</main>
			</div>
		</div>
	);
};

export default FileUploadAndDisplay;
