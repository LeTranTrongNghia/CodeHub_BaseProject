import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/firebase/firebase';

import Sidebar from '@/components/MainHome/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookMarked, Bot, ChevronLeft, CircleUser, Search } from 'lucide-react';

import ReviewCode from './ReviewCode';
import { CODE_SNIPPETS } from './constant/constants';
import LanguageSelector from '/src/components/Code_Editor/LanguageSelector';
import Output from '/src/components/Code_Editor/Output';
import AI from '../AI_chat/AI';
import ProblemDes from '@/components/Code_Editor/ProblemDes';

const CodeEditorWrapper = () => {
	const [value, setValue] = useState('');
	const [language, setLanguage] = useState('');
	const [option, setOption] = useState('1');
	const editorRef = useRef(null);
	const renderProblem = useSelector(state => state.problem.selectedProblem);
	const navigate = useNavigate();

	useEffect(() => {
		if (editorRef.current) {
			monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
				noSemanticValidation: true,
				noSyntaxValidation: true,
			});
		}
	}, [editorRef]);

	const onSelect = (selectedLanguage) => {
		setLanguage(selectedLanguage);
		setValue(CODE_SNIPPETS[selectedLanguage]);
	};

	// const handleLogout = async () => {
	// 	try {
	// 		await signOut(auth);
	// 		toast.success('Logout successful');
	// 		navigate('/login');
	// 	} catch (error) {
	// 		console.error('Logout error:', error);
	// 		toast.error('Logout failed');
	// 	}
	// };

	return (
		<div className='flex min-h-screen w-full flex-col'>
			{/* Topbar */}
			<header className='flex h-16 items-center gap-4 border-b px-4 md:px-6'>
				<nav className='flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
					<div className='flex ml-14'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='outline' size='icon'>
										<a href='/main-home'>
											<ChevronLeft className='h-4 w-4' />
										</a>
									</Button>
								</TooltipTrigger>
								<TooltipContent side='bottom' sideOffset={5}>
									<p>Back to explore</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type='button'
									className={`option ${option === '1' ? 'selected' : ''} flex bg-white p-3 rounded-md text-left w-[120px]`}
									onClick={() => setOption('1')}
								>
									<BookMarked className='size-5 mr-4' />
									Problem
								</button>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={5}>
								<p>See problem description</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type='button'
									className={`option ${option === '2' ? 'selected' : ''} flex bg-white p-3 rounded-md text-left w-[150px]`}
									onClick={() => setOption('2')}
								>
									<Bot className='size-5 mr-4' />
									AI Assistant
								</button>
							</TooltipTrigger>
							<TooltipContent side='bottom' sideOffset={5}>
								<p>Get guide from AI</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</nav>
				<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
					<form className='ml-auto flex-1 sm:flex-initial'>
						<div className='relative hidden'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Search problems...'
								className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='secondary' size='icon' className='rounded-full'>
								<CircleUser className='h-5 w-5' />
								<span className='sr-only'>Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			{/* Sidebar */}
			<Sidebar />

			{/* Main */}
			<main className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
				{/* ProblemDescription & AI_Chat */}
				<div className=''>
					{option === '1' && (
						<div>
							<ProblemDes problem={renderProblem} />
						</div>
					)}
					{option === '2' && (
						<div>
							<AI problem={renderProblem} />
						</div>
					)}
				</div>

				{/* Editor */}
				<div className='relative flex h-full mt-3 flex-col rounded-xl border border-white p-4 lg:col-span-2'>
					<Badge variant='outline' className='absolute right-3 top-3'>
						Editor
					</Badge>
					<div className='w-full h-full'>
						<div className='flex h-20 items-center justify-between'>
							<LanguageSelector language={language} onSelect={onSelect} />
							<div className='mt-5'>
								<ReviewCode userCode={value} problemText={renderProblem} />
							</div>
						</div>
						<Editor
							height='50vh'
							defaultLanguage={language}
							defaultValue={CODE_SNIPPETS[language]}
							theme='vs-dark'
							onMount={(editor) => {
								editorRef.current = editor;
							}}
							value={value}
							onChange={(newValue) => setValue(newValue)}
						/>
						<Output editorRef={editorRef} language={language} />
					</div>
				</div>
			</main>
		</div>
	);
}

export default CodeEditorWrapper;