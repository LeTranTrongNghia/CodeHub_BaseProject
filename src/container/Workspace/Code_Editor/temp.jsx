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