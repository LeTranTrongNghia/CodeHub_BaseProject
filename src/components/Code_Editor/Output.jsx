// Output.jsx

import React, { useState } from 'react';
import { executeCode } from '/src/container/Workspace/Code_Editor/constant/api';

const Output = ({ editorRef, language }) => {
	// Receive runCode prop from CodeEditorWrapper
	const [output, setOutput] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;
		try {
			setIsLoading(true);
			const { run: result } = await executeCode(language, sourceCode);
			setOutput(result.output.split('\n'));
			result.stderr ? setIsError(true) : setIsError(false);
		} catch (error) {
			console.error(error);
			// Simulate error handling
			console.error(
				'An error occurred: ',
				error.message || 'Unable to run code',
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full mt-4'>
			<h2 className='mb-2 text-lg'>Output</h2>
			<button
				className={`text-green-500 border border-green-500 hover:bg-green-100 hover:text-green-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-2 ${
					isLoading ? 'disabled opacity-50 cursor-not-allowed' : ''
				}`}
				isLoading={isLoading}
				onClick={runCode}
			>
				Run Code
			</button>
			<div
				className={`h-full p-2 mt-6 ${
					isError ? 'text-red-400 border-red-500' : 'border-gray-300'
				} border-2 rounded-md`}
			>
				{output
					? output.map((line, i) => <div key={i}>{line}</div>)
					: 'Click "Run Code" to see the output here'}
			</div>
		</div>
	);
};

export default Output;
