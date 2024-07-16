// import React, { useEffect, useState } from 'react';
// import { BsCheck2Circle } from 'react-icons/bs';
// import { AiFillLike, AiFillDislike, AiFillStar } from 'react-icons/ai';
// import { useSelector } from 'react-redux';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '@/firebase/firebase';

// const ProblemDescription = () => {
// 	const renderProblem = useSelector(state => state.problem.selectedProblem);

// 	const [testcase1, setTestcase1] = useState({});
// 	const [testcase2, setTestcase2] = useState({});

// 	const getDocumentById = async docId => {
// 		// Tạo tham chiếu đến document với ID được cung cấp
// 		const docRef = doc(firestore, 'TestCases', docId);

// 		try {
// 			// Lấy document
// 			const docSnap = await getDoc(docRef);

// 			if (docSnap.exists()) {
// 				// Document tồn tại, in ra dữ liệu của nó
// 				return docSnap.data();
// 			} else {
// 				// Document không tồn tại
// 				console.log('No such document!');
// 			}
// 		} catch (error) {
// 			// Xử lý lỗi nếu có
// 			console.error('Error getting document:', error);
// 		}
// 	};
// 	const fetchAndLogDocument = async () => {
// 		try {
// 			const testCase1 = await getDocumentById(renderProblem.testCaseId[0]);
// 			setTestcase1(testCase1);
// 			const testCase2 = await getDocumentById(renderProblem.testCaseId[1]);
// 			setTestcase2(testCase2);
// 		} catch (error) {
// 			console.error('Error fetching document:', error);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchAndLogDocument();
// 	}, []);

// 	return (
// 		<div
// 			className='relative flex-col items-start gap-8 md:flex ml-14'
// 			x-chunk='dashboard-03-chunk-0'
// 		>
// 			<form className='grid w-full items-start gap-6'>
// 				<fieldset className='grid gap-6 rounded-lg border p-4'>
// 					<legend className='-ml-1 px-1 text-lg font-medium'>Problem</legend>
// 					<div className='grid gap-3 w-full'>
// 						{/* Problem Title */}
// 						<div className='mr-2 text-2xl   font-medium'>
// 							{renderProblem.title}
// 						</div>

// 						{/* Problem Sub-bar */}
// 						<div className='flex items-center'>
// 							<div className='inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-x font-medium capitalize text-green-400 bg-green-100'>
// 								{renderProblem.difficulty}
// 							</div>
// 							<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
// 								<BsCheck2Circle />
// 							</div>
// 							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
// 								<AiFillLike className='text-dark-blue-s' />
// 								<span className='text-lg'>{renderProblem.likes}</span>
// 							</div>
// 							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
// 								<AiFillDislike className='text-dark-blue-s' />
// 								<span className='text-lg'>{renderProblem.dislikes}</span>
// 							</div>
// 							<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '>
// 								<AiFillStar className='text-dark-yellow' />
// 							</div>
// 						</div>
// 						{/* Problem Statement */}
// 						<div className='  text-lg'>
// 							<div
// 								dangerouslySetInnerHTML={{
// 									__html: renderProblem.statement,
// 								}}
// 							/>
// 						</div>
// 						{/* Examples */}
// 						<div className=''>
// 							{/* {problem.examples.map((example, index) => (
// 								<div key={example.id}>
// 									<p className='font-medium   text-lg'>Example:</p> */}

// 							<div className='example-card'>
// 								<pre className='text-wrap'>
// 									<p className='font-medium   text-lg'>Example 1:</p>
// 									<strong className=' '>Input: </strong> {testcase1?.inputText}
// 									<br />
// 									<strong className=' '>Output: </strong>
// 									{testcase1?.outputText} <br />
// 									{testcase1?.explanation && (
// 										<>
// 											<strong className=' '>Explanation:</strong>{' '}
// 											{testcase1?.explanation}
// 											<br /> {/* Added <br/> tag */}
// 										</>
// 									)}
// 								</pre>
// 							</div>

// 							<div className='example-card'>
// 								<pre className='text-wrap'>
// 									<p className='font-medium   text-lg'>Example 2:</p>
// 									<strong className=' '>Input: </strong> {testcase2?.inputText}
// 									<br />
// 									<strong className=' '>Output: </strong>
// 									{testcase2?.outputText} <br />
// 									{testcase2?.explanation && (
// 										<>
// 											<strong className=' '>Explanation:</strong>{' '}
// 											{testcase2?.explanation}
// 											<br /> {/* Added <br/> tag */}
// 										</>
// 									)}
// 								</pre>
// 							</div>
// 							{/* </div>
// 							))} */}
// 						</div>
// 						{/* Constraints */}
// 						<div>
// 							<div className='  text-lg font-medium'>Constraints:</div>
// 							<ul className='  list-disc text-lg'>
// 								<div
// 									dangerouslySetInnerHTML={{
// 										__html: renderProblem.constraints,
// 									}}
// 								/>
// 							</ul>
// 						</div>
// 					</div>
// 				</fieldset>
// 			</form>
// 		</div>
// 	);
// };
// export default ProblemDescription;

import { BsCheck2Circle } from 'react-icons/bs';
import { AiFillLike, AiFillDislike, AiFillStar } from 'react-icons/ai';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProblemDescription() {
	const [form, setForm] = useState({
		title: "",
		type: "",
		difficulty: "",
		statement: "",
		constraints: "",
		testCases: [
			{
				explanation: "",
				inputText: "",
				outputText: "",
			},
		],
	});
	const [isNew, setIsNew] = useState(true);
	const [error, setError] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id?.toString();
			if (!id) {
				navigate("/");
				return;
			}
			setIsNew(false);
			try {
				const response = await fetch(`http://localhost:5050/problem/${id}`);
				if (!response.ok) {
					throw new Error(`An error has occurred: ${response.status} - ${response.statusText}`);
				}
				const problem = await response.json();
				if (!problem) {
					console.warn(`Problem with id ${id} not found`);
					navigate("/");
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

	const getDifficultyColorClass = (difficulty) => {
		switch (difficulty) {
			case "Easy":
				return "text-green-600 bg-green-400";
			case "Medium":
				return "text-yellow-600 bg-yellow-400";
			case "Hard":
				return "text-red-600 bg-red-400";
			default:
				return "text-gray-600 bg-gray-400";
		}
	};

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="bg-red-500 text-white p-4 rounded-md">
					<h2 className="text-lg font-bold">Error</h2>
					<p>{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className='relative flex-col items-start gap-8 md:flex ml-14' x-chunk='dashboard-03-chunk-0'>
			<div className='grid w-full items-start gap-6'>
				<fieldset className='grid gap-6 rounded-lg border p-4'>
					<legend className='-ml-1 px-1 text-lg font-medium'>Problem</legend>
					<div className='grid gap-3 w-full'>
						{/* Problem Title */}
						<div className='mr-2 text-2xl font-medium'>
							{form.title}
						</div>

						{/* Problem Sub-bar */}
						<div className='flex items-center'>
							<div className={`inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-x font-medium capitalize ${getDifficultyColorClass(form.difficulty)}`}>
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
								<div key={index} className="sm:col-span-4">
									<pre className='text-wrap'>
										<p className='font-medium text-lg'>Example {index + 1}:</p>
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
	);
};