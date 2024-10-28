import { BsCheck2Circle } from 'react-icons/bs';
import { AiFillLike, AiFillDislike, AiFillStar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import axios from 'axios'; // Add this import
import ReactMarkdown from 'react-markdown'; // Ensure this import is present
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'; // Ensure these imports are present
import { CircleAlert } from 'lucide-react';

export default function ProblemDes() {
	const [form, setForm] = useState({
		title: '',
		type: '',
		difficulty: '',
		statement: '',
		constraints: '',
		testCases: [
			{
				explanation: '',
				inputText: '',
				outputText: '',
			},
		],
	});
	const [isNew, setIsNew] = useState(true);
	const params = useParams();
	const navigate = useNavigate();
	const [hints, setHints] = useState([]); // Add state for hints
	const [generatingHints, setGeneratingHints] = useState(false); // Add state for loading hints

	useEffect(() => {
		async function fetchData() {
			const id = params.id?.toString() || undefined;
			if (!id) return;
			setIsNew(false);
			const response = await fetch(`http://localhost:5050/problem/${id}`);
			if (!response.ok) {
				const message = `An error has occurred: ${response.statusText}`;
				console.error(message);
				return;
			}
			const problem = await response.json();
			if (!problem) {
				console.warn(`Problem with id ${id} not found`);
				navigate('/');
				return;
			}
			setForm(problem);
		}
		fetchData();
		return;
	}, [params.id, navigate]);

	const getDifficultyColorClass = difficulty => {
		switch (difficulty) {
			case 'Easy':
				return 'text-green-600 bg-green-400';
			case 'Medium':
				return 'text-yellow-600 bg-yellow-400';
			case 'Hard':
				return 'text-red-600 bg-red-400';
			default:
				return 'text-gray-600 bg-gray-400';
		}
	};

	async function generateHints() {
		setGeneratingHints(true);
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
									text:
										'Imagine you are a professor majoring in Information Technology. Give me 3 small hints for the following coding problem:\n' +
										'Title: ' +
										form.title +
										'\n' +
										'Statement: ' +
										form.statement +
										'\n' +
										'Give precise hints to help user solve the problem on their own.',
								},
							],
						},
					],
				},
			});

			// Extract hints from the API response
			const generatedHints = response.data.candidates[0].content.parts[0].text
				.split('\n')
				.filter(hint => hint.trim() !== '');
			setHints(generatedHints);
		} catch (error) {
			console.error(error);
			setHints(['Sorry - Could not generate hints at this time.']);
		}
		setGeneratingHints(false);
	}

	return (
		<>
			<div
				className='relative flex-col items-start gap-8 md:flex ml-14'
				x-chunk='dashboard-03-chunk-0'
			>
				<div className='grid w-full items-start gap-6'>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-lg font-medium'>Problem</legend>
						<div className='grid gap-3 w-full'>
							{/* Problem Title */}
							<div className='flex justify-between items-center'>
								<div className='mr-2 text-2xl font-medium'>{form.title}</div>

								{/* Hint Button */}
								<Dialog>
									<DialogTrigger asChild>
										<Button
											className='w-10 h-10 flex items-center justify-center text-white'
											onClick={generateHints}
										>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<a variant='ghost' size='icon'>
															<CircleAlert className='size-5' />
														</a>
													</TooltipTrigger>
													<TooltipContent side='bottom' sideOffset={5}>
														<p>Hint</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</Button>
									</DialogTrigger>
									<DialogContent className='sm:max-w-[425px]'>
										<DialogHeader>
											<DialogTitle>Hint</DialogTitle>
											<div>
												{generatingHints
													? 'Thinking...'
													: hints.map((hint, index) => (
															<ReactMarkdown key={index} className='prose'>
																{hint}
															</ReactMarkdown>
													  ))}
											</div>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</div>

							{/* Problem Sub-bar */}
							<div className='flex items-center'>
								<div
									className={`inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-x font-medium capitalize ${getDifficultyColorClass(
										form.difficulty,
									)}`}
								>
									{form.difficulty}
								</div>
								<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
									<BsCheck2Circle />
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
									<AiFillLike className='text-dark-blue-s' />
									<span className='text-lg'>132</span>
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
									<AiFillDislike className='text-dark-blue-s' />
									<span className='text-lg'>12</span>
								</div>
								<div className='cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6'>
									<AiFillStar className='text-dark-yellow' />
								</div>
							</div>

							{/* Problem Statement */}
							<div className='text-lg'>
								<div dangerouslySetInnerHTML={{ __html: form.statement }} />
							</div>

							{/* Examples */}
							<div>
								{form.testCases.map((testCase, index) => (
									<div key={index} className='sm:col-span-4'>
										<pre className='text-wrap'>
											<p className='font-medium text-lg'>
												Example {index + 1}:
											</p>
											<strong>Input: </strong> {testCase.inputText}
											<br />
											<strong>Output: </strong>
											{testCase.outputText} <br />
											{testCase.explanation && (
												<>
													<strong>Explanation: </strong>
													{testCase.explanation}
												</>
											)}
										</pre>
									</div>
								))}
							</div>

							{/* Constraints */}
							<div>
								<div className='text-lg font-medium'>Constraints:</div>
								<ul className='list-disc text-lg'>
									<div dangerouslySetInnerHTML={{ __html: form.constraints }} />
								</ul>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</>
	);
}
