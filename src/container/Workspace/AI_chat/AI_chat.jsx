import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Bot } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

function AI_chat({ problemText }) {
	const navigate = useNavigate();
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [generatingAnswer, setGeneratingAnswer] = useState(false);

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
					contents: [{ parts: [{ text: 'Imagine you are a AI coding assistant named CodeHub, This is the coding problem Im doing right now' + problemText + '. Answer the question: ' + question }] }],
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
										'Imagine you are a professor majoring in Information Technology. Teach me how to solve this problem: ' +
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
			<div
				className="relative hidden flex-col items-start gap-8 md:flex ml-16" x-chunk="dashboard-03-chunk-0"
			>
				<form onSubmit={generateAnswer} className='text-center overflow-auto'>

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
					<div className="overflow-auto w-[460px] h-[450px] text-left border border-gray rounded-xl mt-10">
						<ReactMarkdown className="mx-auto p-2 prose">
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
				</form>
			</div>
		</>
	);
}

export default AI_chat;