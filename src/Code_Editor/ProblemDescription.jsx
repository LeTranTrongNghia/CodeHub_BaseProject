import React from 'react';
import { BsCheck2Circle } from "react-icons/bs";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";

const ProblemDescription = () => {
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
                explanation: "We iterate through the string in reverse order and build the new string character by character."
            },
            {
                id: 2,
                inputText: "world",
                outputText: "dlrow",
                explanation: "The same logic applies to any string."
            }
        ],
        constraints: `The function should work for strings of any length. 
        You can assume the input string only contains alphanumeric characters.`
    };

    return (
        <div className='bg-dark-layer-1'>
            {/* TAB */}
            <div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden ml-5'>
                <div className={"flex-1 mr-2 text-xl text-white font-medium"}>
                    Description
                </div>
            </div>

            <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
                <div className='px-5'>
                    {/* Problem heading */}
                    <div className='w-full'>
                        <div className='flex space-x-4'>
                            <div className='flex-1 mr-2 text-3xl text-white font-medium'>{problem?.title}</div>
                        </div>

                        <div className='flex items-center mt-3'>
                            <div
                                className='inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-x font-medium capitalize text-green-400 bg-green-100'
                            >
                                {problem.difficulty}
                            </div>
                            <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
                                <BsCheck2Circle />
                            </div>
                            <div
                                className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                            >
                                <AiFillLike className='text-dark-blue-s' />
                                <span className='text-lg'>{problem.likes}</span>
                            </div>
                            <div
                                className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                            >
                                <AiFillDislike className='text-dark-blue-s' />
                                <span className='text-lg'>{problem.dislikes}</span>
                            </div>
                            <div
                                className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
                            >
                                <AiFillStar className='text-dark-yellow' />
                            </div>
                        </div>

                        {/* Problem Statement */}
                        <div className='text-white text-lg mt-4'>
                            <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
                        </div>

                        {/* Examples */}
                        <div className='mt-4'>
                            {problem.examples.map((example, index) => (
                                <div key={example.id}>
                                    <p className='font-medium text-white text-lg'>Example {index + 1}: </p>
                                    {example.img && <img src={example.img} alt='' className='mt-3' />}
                                    <div className='example-card'>
                                        <pre className='text-wrap'>
                                            <strong className='text-white'>Input: </strong> {example.inputText}
                                            <br />
                                            <strong className='text-white'>Output: </strong>
                                            {example.outputText} <br />
                                            {example.explanation && (
                                                <>
                                                    <strong className='text-white'>Explanation:</strong> {example.explanation}<br /> {/* Added <br/> tag */}
                                                </>
                                            )}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Constraints */}
                        <div className='my-8 pb-4'>
                            <div className='text-white text-sm font-medium text-xl'>Constraints:</div>
                            <ul className='text-white ml-5 list-disc text-lg'>
                                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProblemDescription;