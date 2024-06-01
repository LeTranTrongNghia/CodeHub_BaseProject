import {
	CircleUser,
	ChevronLeft,
	Menu,
	Search,
	BookMarked,
	Bot,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import React, { useState, useRef, useEffect } from 'react';
import { CODE_SNIPPETS } from './constant/constants';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor'; // Import monaco-editor
import LanguageSelector from '/src/components/Code_Editor/LanguageSelector';
import Output from '/src/components/Code_Editor/Output';
import ProblemDescription from '@/components/Code_Editor/ProblemDescription';
import AI_chat from '/src/container/Workspace/AI_chat/AI_chat';
import Sidebar from '@/components/MainHome/Sidebar';
import Abc from './Abc';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CodeEditorWrapper = () => {
	const [value, setValue] = useState('');
	const [language, setLanguage] = useState('');
	const [option, setOption] = useState('1');
	const editorRef = useRef(null);
	const userCode = value;
	const renderProblem = useSelector(state => state.problem.selectedProblem); // Assuming useSelector is from a state management library

	const getDocumentById = async docId => {
		// Tạo tham chiếu đến document với ID được cung cấp
		const docRef = doc(firestore, 'TestCases', docId);

		try {
			// Lấy document
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				// Document tồn tại, in ra dữ liệu của nó
				return docSnap.data();
			} else {
				// Document không tồn tại
				console.log('No such document!');
			}
		} catch (error) {
			// Xử lý lỗi nếu có
			console.error('Error getting document:', error);
		}
	};

	const fetchAndLogDocument = async () => {
		try {
			const testCase1 = await getDocumentById(renderProblem.testCaseId[0]);
			setTestcase1(testCase1);
			const testCase2 = await getDocumentById(renderProblem.testCaseId[1]);
			setTestcase2(testCase2);
		} catch (error) {
			console.error('Error fetching document:', error);
		}
	};

	useEffect(() => {
		fetchAndLogDocument();
	}, []);

	const onSelect = (language) => {
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

	const navigate = useNavigate()
	const handleLogout = () => {
		try {
			signOut(auth);
			toast.success('Logout successfully');
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex min-h-screen w-full flex-col bg-black'>
			{/* Topbar */}
			<header className='flex h-16 items-center gap-4 border-b bg-black px-4 md:px-6'>
				<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
					<div className='flex ml-14'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='outline'
										size='icon'
									>
										<a href="/main-home">
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
									type='submit'
									className={`option ${option === '1' ? 'selected' : ''
										} flex bg-white p-3 rounded-md text-left w-[120px]`}
									onClick={e => setOption('1')}
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
									type='submit'
									className={`option ${option === '2' ? 'selected' : ''
										} flex bg-white p-3 rounded-md text-left w-[150px]`}
									onClick={e => setOption('2')}
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
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='shrink-0 md:hidden'
						>
							<Menu className='h-5 w-5' />
							<span className='sr-only'>Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
				</Sheet>
				<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
					<form className='ml-auto flex-1 sm:flex-initial'>
						<div className='relative hidden'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Search problems...'
								className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-black text-white'
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
							{/* <DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem> */}
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			{/* Sidebar */}
			<Sidebar />

			{/* Main */}
			<main className='grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
				{/* ProblemDescription & AI_Chat */}
				<div className='text-white'>
					{option === '1' && (
						<div>
							<ProblemDescription />
						</div>
					)}
					{option === '2' && (
						<div>
							<AI_chat problemText={renderProblem.title} />
						</div>
					)}
				</div>
				{/* Editor */}
				<div className='relative flex h-full mt-3 flex-col rounded-xl bg-black text-white border border-white p-4 lg:col-span-2'>
					<Badge
						variant='outline'
						className='absolute right-3 top-3 text-white'
					>
						Editor
					</Badge>
					<div className='bg-black w-full h-full'>
						<div className='flex h-20 items-center bg-black justify-between'>
							<LanguageSelector language={language} onSelect={onSelect} />
							<div className='mt-5'>
								<Abc userCode={userCode} problemText={renderProblem.title} />
							</div>
						</div>
						<Editor
							height='50vh'
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
			</main>
		</div>
	);
};

export default CodeEditorWrapper;

