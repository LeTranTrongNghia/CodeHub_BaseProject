import Sidebar from '@/components/MainHome/Sidebar';
import Topbar from '@/components/MainHome/Topbar';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';

const ProblemsPerPage = 7; // Number of problems displayed per page

const ProblemsPage = () => {
	const [problems, setProblems] = useState([]);
	const [filteredProblems, setFilteredProblems] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		async function getProblems() {
			try {
				const response = await fetch(`http://localhost:5050/problem/`);
				if (!response.ok) {
					throw new Error(`An error occurred: ${response.statusText}`);
				}
				const problems = await response.json();
				setProblems(problems);
				setFilteredProblems(problems);
			} catch (error) {
				console.error(error);
			}
		}
		getProblems();
	}, []);

	useEffect(() => {
		const filtered = problems.filter(
			problem =>
				problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				problem.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
				problem.difficulty.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setFilteredProblems(filtered);
	}, [searchTerm, problems]);

	const handleSearchChange = e => {
		setSearchTerm(e.target.value);
	};

	const totalPages = Math.ceil(filteredProblems.length / ProblemsPerPage);
	const currentProblems = filteredProblems.slice(
		(currentPage - 1) * ProblemsPerPage,
		currentPage * ProblemsPerPage,
	);

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className='flex min-h-screen w-full flex-col'>
				<Topbar />
				<Sidebar />
				<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16'>
					<Tabs defaultValue='all'>
						<TabsContent value='all'>
							<Card x-chunk='dashboard-06-chunk-0'>
								<CardHeader>
									<h1 className='text-3xl font-medium'>Problems</h1>
									<CardDescription>
										<h1 className='text-sm font-medium'>
											Level up your coding abilities! Explore problems designed
											for all skill sets, from beginner to advanced.
										</h1>
										<div className='mt-4'>
											<Input
												type='text'
												placeholder='Search by title, type, or difficulty'
												className='border rounded-md px-3 py-2 w-full'
												value={searchTerm}
												onChange={handleSearchChange}
											/>
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Title</TableHead>
												<TableHead>Type</TableHead>
												<TableHead>Difficulty</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{currentProblems.map(problem => (
												<Problem problem={problem} key={problem._id} />
											))}
										</TableBody>
									</Table>
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
		</>
	);
};

export default ProblemsPage;

const Problem = ({ problem }) => {
	// Function to determine difficulty color className based on the level
	const getDifficultyColorclassName = difficulty => {
		switch (difficulty) {
			case 'Easy':
				return 'text-green-600'; // Green color for Easy
			case 'Medium':
				return 'text-yellow-600'; // Yellow color for Medium
			case 'Hard':
				return 'text-red-600'; // Red color for Hard
			default:
				return 'text-gray-600'; // Default to gray if no match
		}
	};

	return (
		<tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer'>
			<td className='p-4 align-middle'>
				<Link to={`/problems/solve/${problem._id}`} className='block'>
					{problem.title}
				</Link>
			</td>
			<td className='p-4 align-middle'>
				<Link to={`/problems/solve/${problem._id}`} className='block'>
					{problem.type}
				</Link>
			</td>
			<td
				className={`p-4 align-middle ${getDifficultyColorclassName(
					problem.difficulty,
				)}`}
			>
				<Link to={`/problems/solve/${problem._id}`} className='block'>
					{problem.difficulty}
				</Link>
			</td>
		</tr>
	);
};
