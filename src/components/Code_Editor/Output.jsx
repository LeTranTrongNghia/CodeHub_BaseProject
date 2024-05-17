import React, { useState, useEffect } from 'react';
import { executeCode } from '/src/container/Workspace/Code_Editor/constant/api';

const Output = ({ editorRef, language }) => {
	const problem = {
		title: "Reverse a String",
		difficulty: "Easy", // Replace with "Medium" or "Hard" for different difficulties
		likes: 123,
		dislikes: 5,
		starred: false, // Change to true if the problem is starred by the user
		problemStatement: `Write a function that takes a string as input and returns a new string with the characters reversed. 
     For example, if the input is "hello", the output should be "olleh".`,
		examples: [
			{
				id: 1,
				inputText: "hello",
				outputText: "olleh",
				explanation: "We iterate through the string in reverse order and build the new string character by character.",
			},
			{
				id: 2,
				inputText: "world",
				outputText: "dlrow",
				explanation: "The same logic applies to any string.",
			},
		],
		constraints: `The function should work for strings of any length. 
     You can assume the input source code only contains alphanumeric characters.`,
	};

	const [output, setOutput] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [passedTests, setPassedTests] = useState(0);

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;

		setIsLoading(true);
		setErrorMessage(null); // Clear any previous error message

		try {
			const { run: result } = await executeCode(language, sourceCode);
			setOutput(result.output.split('\n'));
			checkTestcase(result.output.split('\n'));
			result.stderr ? setIsError(true) : setIsError(false);
		} catch (error) {
			console.error(error);
			setIsError(true);
			setErrorMessage('An error occurred while running your code.'); // User-friendly error message
		} finally {
			setIsLoading(false);
		}
	};

	const checkTestcase = (userOutput) => {
		const sourceCode = editorRef.current.getValue();
		let passed = 0;
		const printKeywords = [
			"console.log(",
			"print(",
			"System.out.println(",
			"System.out.print(",
			"Console.WriteLine(",
			"Console.Write(",
		];

		const isOnlyprint = sourceCode.trim().split('\n').every(line => {
			const trimmedLine = line.trim();
			return printKeywords.some(keyword => trimmedLine.startsWith(keyword)) || trimmedLine === '';
		  });		  

		if (isOnlyprint) {
			alert("Failed! Source code only contains print function.");
			setPassedTests(0);
		} else {
			problem.examples.forEach((example) => {
				if (userOutput.includes(example.outputText)) {
					passed++;
				}
			});
			setPassedTests(passed);
		}
	};

	return (
		<div className='w-full mt-4'>
			<div className="flex justify-between items-center">
				<button
					className={`bg-green-500 p-3 rounded-md hover:bg-green-700 transition-all duration-300 mx-2text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'disabled opacity-50 cursor-not-allowed' : ''
						}`}
					isLoading={isLoading}
					onClick={runCode}
				>
					Run Code
				</button>

				<button
					className={`p-3 rounded-md hover:bg-blue-500 transition-all duration-300 text-left px-4 py-2 rounded-md ${passedTests === problem.examples.length ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
					disabled={!output}
				>
					{passedTests}/{problem.examples.length} Submit
				</button>
			</div>

			{isError && (
				<div className="mt-2 text-red-500">{errorMessage}</div>
			)}

			<div
				className={`h-full p-2 mt-4 ${isError ? 'text-red-400 border-red-500' : 'border-gray-300'} border-2 rounded-md`}
			>
				{isLoading && (
					<div className="mt-2 text-center">
						<i className="fas fa-spinner fa-spin"></i> Loading...
					</div>
				)}

				{output
					? output.map((line, i) => <div key={i}>{line}</div>)
					: 'Click "Run Code" to see the output here'}
			</div>
		</div>
	);
};

export default Output;
