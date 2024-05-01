import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

function AI_chat() {
	const navigate = useNavigate();
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [generatingAnswer, setGeneratingAnswer] = useState(false);
	const problemText = `Write a function that takes a string as input and returns a new string with the characters reversed. 
  For example, if the input is "hello", the output should be "olleh".`;

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

	return (
		<>
			<form onSubmit={generateAnswer} className='text-center'>
				<h1 class='text-3xl text-center mb-4 mt-4'>Gemini AI</h1>
				<div className="h-200 overflow-auto mb-4">  <ReactMarkdown className="p-3 prose max-w-prose mx-auto">
					{answer}
				</ReactMarkdown>
				</div>
				<textarea
					required
					className='border rounded w-full min-h-fit p-3 bg-gray-800 text-gray-300'
					value={question}
					onChange={e => setQuestion(e.target.value)}
					placeholder='Enter a promt here'
					style={{ height: '200px' }}
				></textarea>
				<div className='flex justify-center mt-2'>
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
			</form>
		</>
	);
}

export default AI_chat;
