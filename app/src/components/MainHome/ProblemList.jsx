import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProblemsPerPage = 7; // Number of problems displayed per page

const Problem = ({ problem, deleteProblem }) => {
	const getDifficultyColorclassName = difficulty => {
		switch (difficulty) {
			case 'Easy':
				return 'text-green-600 bg-green-400';
			case 'Medium':
				return 'text-yellow-600 bg-yellow-400';
			case 'Hard':
				return 'text-red-600 bg-red-400';
			default:
				return 'text-gray-600 bg-gray-400';
		}
	};

	return (
		<tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
			<td className='p-4 align-middle'>{problem.title}</td>
			<td className='p-4 align-middle'>{problem.type}</td>
			<td
				className={`p-4 align-middle ${getDifficultyColorclassName(
					problem.difficulty,
				)}`}
			>
				{problem.difficulty}
			</td>
			<td className='p-4 align-middle'>
				<div className='flex gap-2'>
					<Link
						className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3'
						to={`/problems/edit/${problem._id}`}
					>
						Edit
					</Link>

					<button
						className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3'
						style={{ color: 'red' }}
						type='button'
						onClick={() => deleteProblem(problem._id)}
					>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
};

const ProblemList = () => {
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

	const deleteProblem = async id => {
		try {
			await fetch(`http://localhost:5050/problem/${id}`, {
				method: 'DELETE',
			});
			const newProblems = problems.filter(problem => problem._id !== id);
			setProblems(newProblems);
			setFilteredProblems(newProblems);
		} catch (error) {
			console.error(error);
		}
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
			<h3 className='text-lg font-semibold p-4'>Problems's list</h3>
			<div className='border rounded-lg overflow-hidden'>
				<div className='p-4'>
					<Input
						type='text'
						placeholder='Search by title, type, or difficulty'
						className='border rounded-md px-3 py-2 w-full'
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>
				<div className='relative w-full overflow-auto'>
					<table className='w-full caption-bottom text-sm'>
						<thead className='[&amp;_tr]:border-b'>
							<tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
								<th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
									Title
								</th>
								<th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
									Type
								</th>
								<th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
									Difficulty
								</th>
								<th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{currentProblems.map(problem => (
								<Problem
									problem={problem}
									deleteProblem={deleteProblem}
									key={problem._id}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className='flex justify-center items-center p-4'>
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
										<span className='text-black font-bold'>{pageNumber}</span>
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
			</div>
		</>
	);
};

export default ProblemList;
