import React, { useState, useEffect } from 'react';
import { executeCode } from '/src/container/Workspace/Code_Editor/constant/api';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Output = ({ editorRef, language }) => {
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
	const [output, setOutput] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [passedTests, setPassedTests] = useState(0);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id?.toString() || undefined;
			if (!id) return;
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
	}, [params.id, navigate]);

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;

		setIsLoading(true);
		setErrorMessage(null);

		try {
			const { run: result } = await executeCode(language, sourceCode);
			const userOutput = result.output.split('\n');
			setOutput(userOutput);
			const passed = checkTestcase(userOutput);
			if (passed === form.testCases.length) {
				toast.success(`Congratulations! All ${passed} test cases passed! 🎉`);
			} else {
				toast.info(
					`Your code passed ${passed} out of ${form.testCases.length} test cases.`,
				);
			}
		} catch (error) {
			console.error(error);
			setIsError(true);
			setErrorMessage('An error occurred while running your code.');
		} finally {
			setIsLoading(false);
		}
	};

	const checkTestcase = userOutput => {
		const sourceCode = editorRef.current.getValue();
		let passed = 0;
		const printKeywords = [
			'console.log(',
			'print(',
			'System.out.println(',
			'System.out.print(',
			'Console.WriteLine(',
			'Console.Write(',
		];

		const isOnlyprint = sourceCode
			.trim()
			.split('\n')
			.every(line => {
				const trimmedLine = line.trim();
				return (
					printKeywords.some(keyword => trimmedLine.startsWith(keyword)) ||
					trimmedLine === ''
				);
			});

		if (isOnlyprint) {
			toast.error('Failed! Source code only contains print function.');
			setPassedTests(0);
			return 0;
		} else {
			const expectedOutputs = form.testCases.map(tc => tc.outputText.trim());
			expectedOutputs.forEach(expectedOutput => {
				if (userOutput.includes(expectedOutput)) {
					passed++;
				}
			});
			setPassedTests(passed);
			return passed;
		}
	};

	return (
		<div className='flex flex-col w-full mt-4'>
			<div className='flex justify-between items-center mb-2'>
				<button
					className='bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-green-700 transition-all duration-300'
					onClick={runCode}
				>
					Run Code
				</button>
				<button
					className={`px-4 py-2 rounded-md text-white ${
						passedTests === form.testCases.length
							? 'bg-green-500'
							: 'bg-red-500'
					} hover:bg-opacity-75 transition-all duration-300`}
					disabled={!output}
					onClick={() => {
						if (passedTests === form.testCases.length) {
							toast.success(
								'Congratulations! All test cases are passed! 🎉🎉🎉',
							);
						} else {
							toast.error(
								`You passed ${passedTests} out of ${form.testCases.length} test cases.`,
							);
						}
					}}
				>
					Submit ({passedTests}/{form.testCases.length})
				</button>
			</div>

			{isError && (
				<div className='text-red-500 text-sm mb-2'>{errorMessage}</div>
			)}

			<div
				className={`h-full p-2 rounded-md border-gray-300 border ${
					isError ? 'border-red-500 text-red-400' : ''
				}`}
			>
				{isLoading ? (
					<div className='text-center mt-2'>
						<i className='fas fa-spinner fa-spin'></i> Loading...
					</div>
				) : output ? (
					output.map((line, i) => (
						<div key={i} className='text-sm'>
							{line}
						</div>
					))
				) : (
					<div>Click "Run Code" to see the output here</div>
				)}
			</div>
		</div>
	);
};

export default Output;
