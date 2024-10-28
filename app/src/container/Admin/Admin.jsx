import Sidebar from '@/components/Admin/Sidebar';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import React, { useEffect, useState } from 'react';
import {
	collection,
	query,
	where,
	orderBy,
	getDocs,
	addDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 5;

const Admin = () => {
	// Problems List & Pagination State
	const [problemList, setProblemList] = useState([]);
	const [filteredProblems, setFilteredProblems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// Search Functionality
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const getProblems = async () => {
			const data = await getDocs(
				query(collection(firestore, 'Problems'), orderBy('title', 'asc')),
			);
			const problemLists = data.docs.map(doc => doc.data());
			setProblemList(problemLists);
			setFilteredProblems(problemLists); // Initially set filtered list to all problems
		};
		getProblems();
	}, []);

	const handleSearchChange = event => {
		setSearchTerm(event.target.value.toLowerCase());
		const filteredList = problemList.filter(problem => {
			const searchText = event.target.value.toLowerCase();
			return (
				problem.title.toLowerCase().includes(searchText) ||
				problem.difficulty.toLowerCase().includes(searchText) ||
				problem.statement.toLowerCase().includes(searchText) ||
				problem.type.toLowerCase().includes(searchText)
			);
		});
		setFilteredProblems(filteredList);
	};

	// Add Problem & testcases

	const [title, setTitle] = useState('');
	const [type, setType] = useState('');
	const [statement, setStatement] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [constraints, setConstraints] = useState('');
	const [testCases, setTestCases] = useState([]); // Array to store test cases

	const handleAddTestCase = () => {
		setTestCases([
			...testCases,
			{ explanation: '', inputText: '', outputText: '' },
		]);
	};

	const handleRemoveTestCase = index => {
		const updatedTestCases = [...testCases];
		updatedTestCases.splice(index, 1);
		setTestCases(updatedTestCases);
	};

	const handleTestCaseChange = (e, index, field) => {
		const updatedTestCases = [...testCases];
		updatedTestCases[index][field] = e.target.value;
		setTestCases(updatedTestCases);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const testCasePromises = testCases.map(async testCase => {
			const testCaseRef = await addDoc(
				collection(firestore, 'TestCases'),
				testCase,
			);
			return testCaseRef.id;
		});

		const testCaseIds = await Promise.all(testCasePromises); // Wait for all test cases to be added

		const newProblem = {
			title,
			statement,
			difficulty,
			type,
			constraints,
			likes: 0,
			dislikes: 0,
			starred: false,
			testCaseId: testCaseIds, // Array of test case IDs
		};

		try {
			const problemRef = doc(collection(firestore, 'Problems'));
			await addDoc(collection(firestore, 'Problems'), newProblem);
		} catch (error) {
			console.error('Error adding document: ', error);
		}

		setTitle('');
		setStatement('');
		setDifficulty('');
		setType('');
		setConstraints('');
		setTestCases([]);
	};

	// Delete Lectures
	const [isDeleted, setIsDeleted] = useState(false);

	const deleteDocument = async title => {
		try {
			const colRef = collection(firestore, 'Problems');
			const q = query(colRef, where('title', '==', title));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async doc => {
				await deleteDoc(doc.ref);
			});
			setIsDeleted(true);
			toast('Delete problem successed! 🎉');
		} catch (error) {
			toast('Error deleting document:', error);
		}
	};

	// Pagination Logic
	const paginatedProblems = filteredProblems.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);

	// Return JSX
	return (
		<div className='flex min-h-screen w-full flex-col '>
			<Sidebar />

			{/* Mainbar */}
			<main className='flex flex-1 items-center flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16'>
				<Tabs defaultValue='all'>
					<div className='flex items-center'>
						<div className='ml-auto flex items-center gap-2'>
							<div className='hidden'></div>
							<Dialog>
								<DialogTrigger asChild>
									<Button size='lg' className='h-8 gap-1'>
										<PlusCircle className='h-3.5 w-3.5' />
										<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
											Add
										</span>
									</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-[425px]'>
									<DialogHeader>
										<DialogTitle>
											<h1 className='text-center'>
												Add new Problem & Testcases
											</h1>
										</DialogTitle>
									</DialogHeader>
									<form
										onSubmit={handleSubmit}
										className='flex flex-col space-y-4'
									>
										<div className='grid gap-4 py-4'>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='title' className='text-right'>
													Title
												</Label>
												<Input
													id='title'
													type='text'
													value={title}
													onChange={e => setTitle(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='statement' className='text-right'>
													Problem Statement
												</Label>
												<Input
													id='statement'
													value={statement}
													onChange={e => setStatement(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='difficulty' className='text-right'>
													Difficulty
												</Label>
												<select
													id='difficulty'
													value={difficulty}
													onChange={e => setDifficulty(e.target.value)}
													className='w-[100px] rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500'
												>
													<option value=''></option>
													<option value='Easy'>Easy</option>
													<option value='Medium'>Medium</option>
													<option value='Hard'>Hard</option>
												</select>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='type' className='text-right'>
													Type
												</Label>
												<Input
													id='type'
													value={type}
													onChange={e => setType(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='constraints' className='text-right'>
													Constraints
												</Label>
												<Input
													id='constraints'
													value={constraints}
													onChange={e => setConstraints(e.target.value)}
													className='col-span-3'
												/>
											</div>
											{/* Test Cases Section */}
											<div className='flex flex-col space-y-2 overflow-y-auto max-h-[340px]'>
												<Button type='button' onClick={handleAddTestCase}>
													Add Test Case
												</Button>
												{testCases.map((testCase, index) => (
													<div
														key={index}
														className='flex flex-col space-y-2 p-2'
													>
														<label
															htmlFor={`explanation-${index}`}
															className='text-sm font-medium'
														>
															Explanation
														</label>
														<Input
															id={`explanation-${index}`}
															value={testCase.explanation}
															onChange={e =>
																handleTestCaseChange(e, index, 'explanation')
															}
															defaultValue='New Title'
															className='col-span-3'
														/>
														<label
															htmlFor={`inputText-${index}`}
															className='text-sm font-medium'
														>
															Input Text
														</label>
														<Input
															id={`inputText-${index}`}
															type='text'
															value={testCase.inputText}
															onChange={e =>
																handleTestCaseChange(e, index, 'inputText')
															}
															className='col-span-3'
														/>
														<label
															htmlFor={`outputText-${index}`}
															className='text-sm font-medium'
														>
															Output Text
														</label>
														<Input
															id={`outputText-${index}`}
															type='text'
															value={testCase.outputText}
															onChange={e =>
																handleTestCaseChange(e, index, 'outputText')
															}
															className='col-span-3'
														/>
														<button
															type='button'
															onClick={() => handleRemoveTestCase(index)}
															className='inline-flex items-center px-2 py-1 bg-red-500  rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
														>
															Remove Test Case
														</button>
													</div>
												))}
											</div>
										</div>
										<Button type='submit'>Add Problem</Button>
									</form>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					<TabsContent value='all'>
						<Card x-chunk='dashboard-06-chunk-0'>
							<CardHeader>
								<h1 className='text-3xl font-medium'>Problems</h1>
								<CardDescription>
									<div className='flex justify-between items-center'>
										<h1 className='text-sm font-medium'>
											Level up your coding abilities! Explore problems designed
											for all skill sets, from beginner to advanced.
										</h1>
										<form className='ml-auto flex-1 sm:flex-initial'>
											<div className='relative'>
												<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
												<Input
													type='search'
													placeholder='Search problems...'
													className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
													value={searchTerm}
													onChange={handleSearchChange}
												/>
											</div>
										</form>
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className=''>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Title</TableHead>
												<TableHead>Type</TableHead>
												<TableHead>Difficulty</TableHead>
												<TableHead>Statement</TableHead>
												<TableHead>Action</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{paginatedProblems.map((item, index) => (
												<TableRow key={index}>
													<TableCell>
														<div className='font-medium'>{item.title}</div>
													</TableCell>
													<TableCell>
														<div className='font-medium'>{item.type}</div>
													</TableCell>
													<TableCell>
														<div className='font-medium'>{item.difficulty}</div>
													</TableCell>
													<TableCell>
														<div className='font-medium'>{item.statement}</div>
													</TableCell>
													<TableCell>
														<button
															className='bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded'
															onClick={() => deleteDocument(item.title)}
														>
															Delete
														</button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
							<CardFooter>
								<Pagination>
									<PaginationContent>
										{currentPage > 1 && (
											<PaginationItem>
												<PaginationPrevious
													onClick={() => handlePageChange(currentPage - 1)}
												/>
											</PaginationItem>
										)}
										{Array.from({ length: totalPages }, (_, i) => i + 1).map(
											pageNumber => (
												<PaginationItem key={pageNumber}>
													{pageNumber === currentPage ? (
														<span className='text-black font-bold'>
															{pageNumber}
														</span>
													) : (
														<PaginationLink
															onClick={() => handlePageChange(pageNumber)}
														>
															{pageNumber}
														</PaginationLink>
													)}
												</PaginationItem>
											),
										)}
										{currentPage < totalPages && (
											<PaginationItem>
												<PaginationNext
													onClick={() => handlePageChange(currentPage + 1)}
												/>
											</PaginationItem>
										)}
										{totalPages > 5 &&
											currentPage !== totalPages &&
											currentPage !== 1 && (
												<PaginationItem>
													<PaginationEllipsis />
												</PaginationItem>
											)}
									</PaginationContent>
								</Pagination>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
};
export default Admin;
