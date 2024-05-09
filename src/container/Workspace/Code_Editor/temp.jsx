import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor'; // Import monaco-editor
import LanguageSelector from "/src/components/Code_Editor/LanguageSelector";
import Output from "/src/components/Code_Editor/Output";
import ProblemDescription from "/src/components/Code_Editor/ProblemDescription";
import AI_chat from "/src/container/Workspace/AI_chat/AI_chat";
import { CODE_SNIPPETS } from './constant/constants';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const [value, setValue] = useState('');
const [language, setLanguage] = useState('');
const [option, setOption] = useState('1');
const editorRef = useRef();

const onSelect = language => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
};

useEffect(() => {
    if (editorRef.current) {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
        });
    }
}, [editorRef]);

<div className='flex min-h-screen bg-gray-900 text-gray-400 px-6 py-8'>
    <div className='w-3/5 bg-gray-800 text-gray-300 p-4 rounded-md mr-4'>
        <button
            type='submit'
            class='bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-4'
            onClick={() => navigate('/')}
        >
            Back to Homepage
        </button>
        <button
            type='submit'
            className={`option ${option === '1' ? 'selected' : ''} bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-4`}
            onClick={(e) => setOption('1')}
        >
            Code Editor
        </button>
        <button
            type='submit'
            className={`option ${option === '2' ? 'selected' : ''} bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white ml-4`}
            onClick={(e) => setOption('2')}
        >
            AI Assistant
        </button>
        <div>
            {option === '1' && <div><ProblemDescription /></div>}
            {option === '2' && <div><AI_chat /></div>}
        </div>
    </div>

    <div className='w-2/5 bg-gray-800 text-gray-300 p-4 rounded-md'>
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
            height='58vh'
            defaultLanguage={language}
            defaultValue={CODE_SNIPPETS[language]}
            theme='vs-dark'
            onMount={editor => {
                editorRef.current = editor;
            }}
            value={value}
            onChange={value => setValue(value)}
        />
        <Output editorRef={editorRef} language={language} />
    </div>
</div>


{/* <div className="flex-1">
					<form
						className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
					>
						<Label htmlFor="message" className="sr-only">
							Message
						</Label>
						<Textarea
							id="message"
							placeholder="Type your message here..."
							className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
						/>
						<div className="flex items-center p-3 pt-0">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="ghost" size="icon">
											<Paperclip className="size-4" />
											<span className="sr-only">Attach file</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent side="top">Attach File</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="ghost" size="icon">
											<Mic className="size-4" />
											<span className="sr-only">Use Microphone</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent side="top">Use Microphone</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<Button type="submit" size="sm" className="ml-auto gap-1.5">
								Send Message
								<CornerDownLeft className="size-3.5" />
							</Button>
						</div>
					</form>
				</div> */}


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