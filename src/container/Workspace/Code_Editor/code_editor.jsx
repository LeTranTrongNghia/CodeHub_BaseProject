import {
	CircleUser,
	ChevronLeft,
	Menu,
	Search,
	Bird,
	Book,
	Bot,
	Code2,
	CornerDownLeft,
	LifeBuoy,
	Mic,
	Paperclip,
	Rabbit,
	Settings2,
	SquareTerminal,
	Triangle,
	Turtle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { useState, useRef, useEffect } from 'react';
import { BsCheck2Circle } from "react-icons/bs";
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { CODE_SNIPPETS } from './constant/constants';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor'; // Import monaco-editor
import LanguageSelector from "/src/components/Code_Editor/LanguageSelector";
import Output from "/src/components/Code_Editor/Output";


const CodeEditorWrapper = () => {
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

	return <div className="flex min-h-screen w-full flex-col bg-black">
		{/* Topbar */}
		<header className="flex h-16 items-center gap-4 border-b bg-black px-4 md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<div className="ml-14">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" onClick={() => window.location.href = "/"}>
									<ChevronLeft className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								<p>Back to explore</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 md:hidden"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search problems..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-black text-white"
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
		{/* Sidebar */}
		<aside className="inset-y fixed bg-black left-0 z-20 flex h-full flex-col border-r">
			<div className="p-2 mt-1 bg-black">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" aria-label="Home">
								<Triangle className="size-5 fill-foreground" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							<p>CodeHub</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div className="grid gap-1 p-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg bg-muted bg-black text-white"
								aria-label="Playground"
							>
								<SquareTerminal className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							<p>Explore</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg bg-black text-white"
								aria-label="Models"
							>
								<Bot className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Playground
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg bg-black text-white"
								aria-label="API"
							>
								<Code2 className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Problem
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg bg-black text-white"
								aria-label="Documentation"
							>
								<Book className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Courses
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg bg-black text-white"
								aria-label="Settings"
							>
								<Settings2 className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Settings
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div className="mt-auto grid gap-1 p-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="mt-auto rounded-lg bg-black text-white"
								aria-label="Help"
							>
								<LifeBuoy className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Help
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</aside>
		{/* Main */}
		<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
			{/* ProblemDescription */}
			<div
				className="relative hidden flex-col items-start gap-8 md:flex ml-14 text-white" x-chunk="dashboard-03-chunk-0"
			>
				<form className="grid w-full items-start gap-6">
					<fieldset className="grid gap-6 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-lg font-medium">
							Problem
						</legend>
						<div className="grid gap-3 w-full">
							{/* Problem Title */}
							<div className='flex justify-between items-center mr-2 text-2xl text-white font-medium'>
								{problem?.title}
								<Button variant="secondary">AI Assistant</Button>
							</div>

							{/* Problem Sub-bar */}
							<div className='flex items-center'>
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
							<div className='text-white text-lg'>
								<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
							</div>
							{/* Examples */}
							<div>
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
							<div>
								<div className='text-white text-lg font-medium'>Constraints:</div>
								<ul className='text-white list-disc text-lg'>
									<div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
								</ul>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
			{/* Editor */}
			<div className="relative flex h-full mt-3 flex-col rounded-xl bg-black text-white border border-white p-4 lg:col-span-2">
				<Badge variant="outline" className="absolute right-3 top-3 text-white">
					Editor
				</Badge>
				<div className="bg-black w-full h-full">
					<LanguageSelector language={language} onSelect={onSelect} />
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
		</main >
	</div >
};

export default CodeEditorWrapper;
