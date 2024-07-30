import {
    Bird,
    CornerDownLeft,
    Paperclip,
    Rabbit,
    Settings,
    Share,
    Turtle,
    Clipboard,
    ConstructionIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { CODE_SNIPPETS } from "@/container/Workspace/Code_Editor/constant/constants";
import { executeCode } from '/src/container/Workspace/Code_Editor/constant/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ChartComponent from "./chart";

const FileUploadAndDisplay = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [error, setError] = useState('');

    const fileInputRef = React.useRef(null);

    // Disallowed file extensions
    const disallowedExtensions = [
        '.doc', '.docx', '.pdf', '.ppt', '.pptx', '.txt',
        '.mp3', '.wav', '.ogg', '.mp4', '.avi', '.mov', '.wmv'
    ];

    const isAllowedFile = (file) => {
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        return !disallowedExtensions.includes(extension);
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    const handleFileChange = async (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setError('');

        // Filter out disallowed file types
        const allowedFiles = uploadedFiles.filter(isAllowedFile);

        if (allowedFiles.length !== uploadedFiles.length) {
            setError('Only Code files allowed!');
        }

        if (allowedFiles.length > 0) {
            const fileContents = await Promise.all(allowedFiles.map(readFileContent));
            setFiles(fileContents);
            setSelectedFile(null);
        }
    };

    const handleFileSelect = (fileName) => {
        const file = files.find(f => f.name === fileName);
        if (file) {
            setSelectedFile(file); // Optional: update the selected file state
            console.log('Selected File Name:', file.name); // Log the file name
            console.log('Selected File Content:', file.content); // Log the file content

            setValue(file.content);

            // Determine the file extension and set the language accordingly
            const extension = file.name.split('.').pop().toLowerCase();
            let selectedLanguage = '';

            switch (extension) {
                case 'py':
                    selectedLanguage = 'python';
                    break;
                case 'js':
                    selectedLanguage = 'javascript';
                    break;
                case 'ts':
                    selectedLanguage = 'typescript';
                    break;
                case 'java':
                    selectedLanguage = 'java';
                    break;
                case 'cs':
                    selectedLanguage = 'csharp';
                    break;
                case 'php':
                    selectedLanguage = 'php';
                    break;
                default:
                    selectedLanguage = 'unknown'; // Default case if needed
                    break;
            }

            setLanguage(selectedLanguage); // Update the language state
            console.log('Selected Language:', selectedLanguage); // Log the selected language
        }
    };

    const generateAnswer = async (e) => {
        e.preventDefault();
        setGeneratingAnswer(true);
        setChatHistory([...chatHistory, { type: 'question', text: question }]);

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                method: 'post',
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Imagine you are an AI coding assistant named CodeHub. Analyze the following file contents and answer the question:\n\n${files.map(file => `${file.name}:\n${file.content}\n\n`).join('')}\nQuestion: ${question}`,
                                },
                            ],
                        },
                    ],
                },
            });

            const answerText = response.data.candidates[0].content.parts[0].text;
            const containsCode = /<code>([\s\S]*?)<\/code>/.test(answerText);

            setChatHistory([
                ...chatHistory,
                { type: 'question', text: question },
                { type: 'answer', text: answerText, containsCode },
            ]);
        } catch (error) {
            console.log(error);
            setChatHistory([
                ...chatHistory,
                { type: 'question', text: question },
                { type: 'answer', text: 'Sorry - Something went wrong. Please try again!', containsCode: false },
            ]);
        }

        setGeneratingAnswer(false);
        setQuestion('');
    };

    const extractLanguageAndCode = (text) => {
        const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/;
        const match = text.match(codeBlockRegex);
        if (match) {
            return { language: match[1], code: match[2] };
        }
        return { language: null, code: text };
    };

    const requestRating = async () => {
        if (!selectedFile) {
            console.log('No file selected.');
            return;
        }

        setGeneratingAnswer(true);
        console.log('Requesting rating for:', selectedFile.name);

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                method: 'post',
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Rate the following code on a scale from 1 to 100 for the following criteria:\n\nCorrectness\nPerformance\nClarity\nGive me the answer of numbers in order only, for example: 90\n 70\n 80\n.\n\nCode:\n${selectedFile.content}`,
                                },
                            ],
                        },
                    ],
                },
            });

            const ratings = response.data.candidates[0].content.parts[0].text.trim().split('\n');
            if (ratings.length === 3) {
                setCorrectnessRating(ratings[0]);
                setPerformanceRating(ratings[1]);
                setClarityRating(ratings[2]);
                console.log('Ratings received:');
                console.log('Correctness:', ratings[0]);
                console.log('Performance:', ratings[1]);
                console.log('Clarity:', ratings[2]);
            } else {
                console.log('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.log('Error while requesting ratings:', error);
        } finally {
            setGeneratingAnswer(false);
        }
    };

    const chartRating = async () => {
        if (!selectedFile) {
            console.log('No file selected.');
            return;
        }

        setGeneratingAnswer(true);
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'question', text: 'Rate my code' }
        ]);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Imagine you are an AI coding assistant named CodeHub. Analyze the following file contents and rate the following code on a scale from 1 to 100 for the following criteria:\n\nSyntax analysis\nFunction definition check\nLogic analysis\nEfficiency\nReadability.\nProvide the answer in numbers only, for example: 92\n78\n81\n100\n90\n.\n\nCode:\n${selectedFile.content}`,
                                },
                            ],
                        },
                    ],
                }
            );

            const ratings = response.data.candidates[0].content.parts[0].text.trim().split('\n');
            if (ratings.length === 5) {
                const newChartData = {
                    syntax: ratings[0],
                    functionDefinition: ratings[1],
                    logic: ratings[2],
                    efficiency: ratings[3],
                    readability: ratings[4],
                };
                setChartData(newChartData);

                // Use functional form of setChatHistory to ensure you are working with the latest state
                setChatHistory(prevChatHistory => [
                    ...prevChatHistory,
                    { type: 'chart', data: newChartData }
                ]);

                console.log('Ratings received:');
                console.log('Syntax:', ratings[0]);
                console.log('Function Definition:', ratings[1]);
                console.log('Logic:', ratings[2]);
                console.log('Efficiency:', ratings[3]);
                console.log('Readability:', ratings[4]);
            } else {
                console.log('Unexpected response format:', response.data);
            }

        } catch (error) {
            console.error('Error while requesting ratings:', error);
        } finally {
            setGeneratingAnswer(false);
        }
    };

    const reviewMyCode = async () => {
        if (!selectedFile) {
            console.log('No file selected.');
            return '';
        }

        setGeneratingAnswer(true);
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { type: 'question', text: 'Review my code in details' }
        ]);

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                method: 'post',
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Imagine you are an AI coding assistant named CodeHub. Analyze the following file contents and provide a detailed review based on these categories:\n\nSyntax analysis\nFunction definition check\nLogic analysis\nEfficiency\nReadability.\n\nGive me a detailed review for each category.
                                    Answer like this format. Keep it brief and concise, short and simple:
                                    \nSyntax analysis: ...
                                    \nFunction definition check: ...
                                    \nLogic analysis: ...
                                    \nEfficiency: ...
                                    \nReadability: ...
                                    \nRecommendations: ...
                                    \n\nCode:\n${selectedFile.content}`,
                                },
                            ],
                        },
                    ],
                },
            });

            let reviewText = response.data.candidates[0].content.parts[0].text;

            reviewText = reviewText.replace(/\*/g, '');

            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'answer', text: reviewText, containsCode: false, isHtml: true } // Add isHtml flag to indicate HTML content
            ]);

            setGeneratingAnswer(false);
            return reviewText; // Return the review text

        } catch (error) {
            console.log(error);
            setChatHistory(prevChatHistory => [
                ...prevChatHistory,
                { type: 'answer', text: 'Sorry - Something went wrong. Please try again!', containsCode: false }
            ]);

            setGeneratingAnswer(false);
            return ''; // Return an empty string in case of an error
        }
    };

    const [chartData, setChartData] = useState(0);

    const [correctnessRating, setCorrectnessRating] = useState(0);
    const [performanceRating, setPerformanceRating] = useState(0);
    const [clarityRating, setClarityRating] = useState(0);

    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('');
    const editorRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const { run: result } = await executeCode(language, sourceCode);
            const userOutput = result.output.split('\n');
            setOutput(userOutput);
        } catch (error) {
            console.error(error);
            setIsError(true);
            setErrorMessage('An error occurred while running your code.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid h-screen w-full pl-[56px]">
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                    <h1 className="text-xl font-semibold">Playground</h1>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Settings className="size-4" />
                                <span className="sr-only">Settings</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-h-[80vh]">
                            <DrawerHeader>
                                <DrawerTitle>Configuration</DrawerTitle>
                                <DrawerDescription>
                                    Configure the settings for the model and messages.
                                </DrawerDescription>
                            </DrawerHeader>
                            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Settings
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="model">Model</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="model"
                                                className="items-start [&_[data-description]]:hidden"
                                            >
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="genesis">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Rabbit className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Genesis
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Our fastest model for general use cases.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="explorer">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Bird className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Explorer
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Performance and speed for efficiency.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="quantum">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Turtle className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Quantum
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                The most powerful model for complex
                                                                computations.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="file">Upload your code files</Label>
                                        <Input id="file" type="file" />
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Messages
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Role</Label>
                                        <Select defaultValue="system">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="system">System</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="assistant">Assistant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea id="content" placeholder="You are a..." />
                                    </div>
                                </fieldset>
                            </form>
                        </DrawerContent>
                    </Drawer>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                    >
                        <Share className="size-3.5" />
                        Share
                    </Button>
                </header>
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-3" style={{ gridTemplateColumns: "20rem 0.8fr 1fr" }}>
                    <div
                        className="relative hidden flex-col items-start gap-8 md:flex max-w-[20rem]"
                    >
                        <form className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Infomation
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Model</Label>
                                    <Select>
                                        <SelectTrigger
                                            id="model"
                                            className="items-start [&_[data-description]]:hidden"
                                        >
                                            <SelectValue placeholder="Select a model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="genesis">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Rabbit className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Genesis
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Our fastest model for general use cases.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="explorer">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Bird className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Explorer
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Performance and speed for efficiency.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="quantum">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Turtle className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Quantum
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            The most powerful model for complex computations.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="file">Upload your code files</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        ref={fileInputRef} // Attach the ref
                                    />
                                </div>
                            </fieldset>
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Result
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="role">Files</Label>
                                    <Select value={selectedFile ? selectedFile.name : ''} onValueChange={handleFileSelect}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a file" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {files.map((file, index) => (
                                                <SelectItem key={index} value={file.name}>
                                                    {file.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="content">Overall Review</Label>
                                    <Card className="max-w">
                                        <CardContent className="flex gap-4 p-4">
                                            <div className="grid items-center gap-2">
                                                <div className="grid flex-1 auto-rows-min gap-0.5">
                                                    <div className="text-sm text-muted-foreground">Correctness</div>
                                                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2662d9]">
                                                        {correctnessRating !== null ? `${correctnessRating}/100` : 'N/A'}
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            points
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid flex-1 auto-rows-min gap-0.5">
                                                    <div className="text-sm text-muted-foreground">Performance</div>
                                                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2eb88a]">
                                                        {performanceRating !== null ? `${performanceRating}/100` : 'N/A'}
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            points
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid flex-1 auto-rows-min gap-0.5">
                                                    <div className="text-sm text-muted-foreground">Clarity</div>
                                                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#e88c30]">
                                                        {clarityRating !== null ? `${clarityRating}/100` : 'N/A'}
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            points
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChartContainer
                                                config={{
                                                    Correctness: {
                                                        label: "Correctness",
                                                        color: "hsl(var(--chart-3))",
                                                    },
                                                    Performance: {
                                                        label: "Performance",
                                                        color: "hsl(var(--chart-2))",
                                                    },
                                                    Clarity: {
                                                        label: "Clarity",
                                                        color: "hsl(var(--chart-1))",
                                                    },
                                                }}
                                                className="mx-auto aspect-square w-full max-w-[80%]"
                                            >
                                                <RadialBarChart
                                                    margin={{
                                                        left: -10,
                                                        right: -10,
                                                        top: -10,
                                                        bottom: -10,
                                                    }}
                                                    data={[
                                                        {
                                                            activity: "Correctness",
                                                            value: correctnessRating,
                                                            fill: "var(--color-Correctness)",
                                                        },
                                                        {
                                                            activity: "Performance",
                                                            value: performanceRating,
                                                            fill: "var(--color-Performance)",
                                                        },
                                                        {
                                                            activity: "Clarity",
                                                            value: clarityRating,
                                                            fill: "var(--color-Clarity)",
                                                        },
                                                    ]}
                                                    innerRadius="20%"
                                                    barSize={24}
                                                    startAngle={90}
                                                    endAngle={450}
                                                >
                                                    <PolarAngleAxis
                                                        type="number"
                                                        domain={[0, 100]}
                                                        dataKey="value"
                                                        tick={false}
                                                    />
                                                    <RadialBar dataKey="value" background cornerRadius={5} />
                                                </RadialBarChart>
                                            </ChartContainer>

                                        </CardContent>
                                    </Card>
                                    <Button
                                        type="button"
                                        size="sm"
                                        className="mt-4"
                                        onClick={requestRating}
                                        disabled={generatingAnswer}
                                    >
                                        {generatingAnswer ? 'Rating your code...' : 'Request Rating'}
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    </div>

                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl border mt-2 p-4 flex-1">
                        <Badge variant="outline" className="absolute right-3 top-3">
                            Output
                        </Badge>
                        <div className="flex-1 overflow-auto p-4 mt-4 mb-4 max-h-[32rem]">
                            {chatHistory.map((chat, index) => {
                                if (chat.type === 'message') {
                                    return (
                                        <div key={index} className="mb-4 rounded-lg p-2 bg-blue-200 text-right">
                                            {chat.text}
                                        </div>
                                    );
                                }

                                if (chat.type === 'chart' && chartData) {
                                    return (
                                        <div key={index} className="mb-4 rounded-lg p-2 bg-gray-100">
                                            <ChartComponent ratings={chartData} />
                                        </div>
                                    );
                                }

                                const { language, code } = extractLanguageAndCode(chat.text);
                                return (
                                    <div
                                        key={index}
                                        className={`mb-4 rounded-lg p-2 ${chat.type === 'question' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}
                                    >
                                        {language ? (
                                            <div className="relative bg-blue-100 p-4 rounded-lg overflow-x-auto">
                                                <SyntaxHighlighter
                                                    language={language}
                                                    style={coy}
                                                    customStyle={{ overflowY: 'auto', maxWidth: '27rem' }}
                                                >
                                                    {code}
                                                </SyntaxHighlighter>
                                                <Button
                                                    className="absolute top-2 right-2 p-1 bg-blue-700 text-white rounded"
                                                    onClick={() => navigator.clipboard.writeText(code)}
                                                >
                                                    <Clipboard className="size-4 mx-2" />
                                                </Button>
                                            </div>
                                        ) : (
                                            chat.text
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <form onSubmit={generateAnswer} className="relative overflow-hidden">
                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>

                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="min-h-12 resize-none p-3 focus-visible:ring-0"
                            />
                            <div className="flex items-center pt-3">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(event) => {
                                                    event.preventDefault(); // Prevent form submission
                                                    fileInputRef.current.click(); // Trigger the file input click
                                                }}
                                            >
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Attach File</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button
                                    type="button"
                                    size="sm"
                                    className="ml-2 bg-white text-black border hover:bg-gray-100 rounded p-1"
                                    onClick={chartRating}
                                    disabled={generatingAnswer}
                                >
                                    Rate my code
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    className="ml-2 bg-white text-black border hover:bg-gray-100 rounded p-1"
                                    onClick={reviewMyCode}
                                    disabled={generatingAnswer}
                                >
                                    Review Details
                                </Button>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={generatingAnswer}>
                                    {generatingAnswer ? 'Generating...' : 'Send Message'}
                                    <CornerDownLeft className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl border mt-2 p-4 flex-1">
                        <Badge variant='outline' className='absolute right-3 top-3'>
                            Editor
                        </Badge>
                        <div className="flex-1 overflow-auto p-4 mt-4 mb-4">
                            <div className='w-full h-full'>
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
                                <div className="flex flex-col w-full mt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-green-700 transition-all duration-300"
                                            onClick={runCode}
                                        >
                                            Run Code
                                        </button>
                                    </div>
                                    {isError && (
                                        <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
                                    )}

                                    <div className={`h-full p-2 rounded-md border-gray-300 border ${isError ? 'border-red-500 text-red-400' : ''}`}>
                                        {isLoading ? (
                                            <div className="text-center mt-2">
                                                <i className="fas fa-spinner fa-spin"></i> Running code...
                                            </div>
                                        ) : (
                                            output ? (
                                                output.map((line, i) => <div key={i} className="text-sm">{line}</div>)
                                            ) : (
                                                <div>Click "Run Code" to see the output here</div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FileUploadAndDisplay;