import React, { useState, useEffect } from 'react';
import { executeCode } from '/src/container/Workspace/Code_Editor/constant/api';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

const Output = ({ editorRef, language }) => {
	const renderProblem = useSelector(state => state.problem.selectedProblem);

	const [output, setOutput] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [passedTests, setPassedTests] = useState(0);
	const [testcases, setTestcases] = useState({}); // Object to store test cases

	const getDocumentById = async (docId) => {
		try {
			const docRef = doc(firestore, 'TestCases', docId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists) {
				return docSnap.data();
			} else {
				console.log('No such document!');
			}
		} catch (error) {
			console.error('Error getting document:', error);
		}
		return null;
	};

	const fetchTestCases = async () => {
		try {
			const testCase1Data = await getDocumentById(renderProblem.testCaseId[0]);
			const testCase2Data = await getDocumentById(renderProblem.testCaseId[1]);
			setTestcases({
				testcase1: testCase1Data?.outputText,
				testcase2: testCase2Data?.outputText,
			});
		} catch (error) {
			console.error('Error fetching test cases:', error);
		}
	};

	useEffect(() => {
		fetchTestCases();
	}, [renderProblem]); // Re-fetch test cases when selected problem changes

	const runCode = async () => {
		const sourceCode = editorRef.current.getValue();
		if (!sourceCode) return;

		setIsLoading(true);
		setErrorMessage(null);

		try {
			const { run: result } = await executeCode(language, sourceCode);
			setOutput(result.output.split('\n'));
			checkTestcase(result.output.split('\n'));
		} catch (error) {
			console.error(error);
			setIsError(true);
			setErrorMessage('An error occurred while running your code.');
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
			const expectedOutputs = Object.values(testcases); // Get array of expected outputs
			expectedOutputs.forEach(expectedOutput => {
				if (userOutput.includes(expectedOutput)) {
					passed++;
				}
			});
			setPassedTests(passed);
			alert(`Your code passed ${passed} out of ${expectedOutputs.length} test cases.`); // Alert after checking test cases
		}
	};

	return (
		<div className="flex flex-col w-full mt-4">
			<div className="flex justify-between items-center mb-2">
				<button
					className={`bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-green-700 transition-all duration-300`}
					onClick={runCode}
				>
					Run Code
				</button>
				<button
					className={`px-4 py-2 rounded-md text-white ${passedTests === Object.keys(testcases).length ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-75 transition-all duration-300 disabled:opacity-50`}
					disabled={!output}
					onClick={() => {
						if (passedTests === Object.keys(testcases).length) {
							alert("Congratulations! All test cases are passed! 🎉🎉🎉");
						} else {
							alert(`You passed ${passedTests} out of ${Object.keys(testcases).length} test cases.`);
						}
					}}
				>
					Submit ({passedTests}/{Object.keys(testcases).length})
				</button>
			</div>

			{isError && (
				<div className="text-red-500 text-sm mb-2">{errorMessage}</div>
			)}

			<div
				className={`h-full p-2 rounded-md border-gray-300 border ${isError ? 'border-red-500 text-red-400' : ''
					}`}
			>
				{isLoading && (
					<div className="text-center mt-2">
						<i className="fas fa-spinner fa-spin"></i> Loading...
					</div>
				)}

				{output
					? output.map((line, i) => <div key={i} className="text-sm">{line}</div>)
					: 'Click "Run Code" to see the output here'}
			</div>
		</div>
	);
};

export default Output;