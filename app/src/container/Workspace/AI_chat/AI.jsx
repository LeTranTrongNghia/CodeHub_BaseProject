import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button'; // Ensure Button is imported
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import { Badge } from '@/components/ui/badge'; // Import Badge
import { CornerDownLeft } from 'lucide-react'; // Import necessary icons
import { Label } from '@/components/ui/label';

export default function AI() {
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
	const [error, setError] = useState(null);
	const [question, setQuestion] = useState('');
	const [chatHistory, setChatHistory] = useState([]); // State for chat history
	const [generatingAnswer, setGeneratingAnswer] = useState(false);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id?.toString();
			if (!id) {
				navigate('/');
				return;
			}
			setIsNew(false);
			try {
				const response = await fetch(`http://localhost:5050/problem/${id}`);
				if (!response.ok) {
					throw new Error(
						`An error has occurred: ${response.status} - ${response.statusText}`,
					);
				}
				const problem = await response.json();
				if (!problem) {
					console.warn(`Problem with id ${id} not found`);
					navigate('/');
					return;
				}
				setForm(problem);
			} catch (error) {
				setError(error.message);
				console.error(error);
			}
		}
		fetchData();
		return;
	}, [params.id, navigate]);

	const generateAnswer = async e => {
		e.preventDefault();
		setGeneratingAnswer(true);
		setChatHistory([...chatHistory, { type: 'question', text: question }]);

		let promptPrefix =
			'Imagine you are a professor majoring in Information Technology. Give precise answer to help user solve the problem on their own. Do not answer by code.';

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
									text: `${promptPrefix} Analyze the following problem statement:\n\n${form.statement}\nQuestion: ${question}`,
								},
							],
						},
					],
				},
			});

			const answerText = response.data.candidates[0].content.parts[0].text;

			// Replace **text** with <strong>text</strong>
			const formattedAnswerText = answerText.replace(
				/\*\*(.*?)\*\*/g,
				'<strong>$1</strong>',
			);

			setChatHistory(prev => [
				...prev,
				{ type: 'answer', text: formattedAnswerText },
			]);
		} catch (error) {
			console.log(error);
			setChatHistory(prev => [
				...prev,
				{
					type: 'answer',
					text: 'Sorry - Something went wrong. Please try again!',
				},
			]);
		}

		setGeneratingAnswer(false);
	};

	return (
		<div className='relative flex h-full min-h-[85vh] ml-16 flex-col rounded-xl border mt-2 p-4 flex-1'>
			<Badge variant='outline' className='absolute right-3 top-3'>
				Output
			</Badge>
			<div className='flex-1 overflow-auto p-4 mt-4 mb-4 max-h-[32rem]'>
				{chatHistory.map((chat, index) => (
					<div
						key={index}
						className={`mb-4 rounded-lg p-2 ${
							chat.type === 'question'
								? 'bg-blue-100 text-right'
								: 'bg-gray-100'
						}`}
					>
						{chat.type === 'question' ? (
							<ReactMarkdown>{chat.text}</ReactMarkdown>
						) : (
							<div
								dangerouslySetInnerHTML={{ __html: chat.text }}
								className='whitespace-pre-line'
							/>
						)}
					</div>
				))}
			</div>

			<form onSubmit={generateAnswer} className='relative overflow-hidden'>
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
	);
}
