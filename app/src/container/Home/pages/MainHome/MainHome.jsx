import DateButton from '@/components/MainHome/DateButton';
import Sidebar from '@/components/MainHome/Sidebar';
import Topbar from '@/components/MainHome/Topbar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Spline from '@splinetool/react-spline';
import {
	Activity,
	ArrowUpRight,
	BookMarked,
	Code2,
	CreditCard,
} from 'lucide-react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
	setProblems,
	setSelectedProblem,
} from '@/redux/problemReducer/problemReducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainHome = () => {
	// const [username, setUsername] = useState('');

	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged(async user => {
	// 		try {
	// 			if (user) {
	// 				const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
	// 				if (userDoc.exists()) {
	// 					const userData = userDoc.data();
	// 					setUsername(userData.display_name);
	// 				} else {
	// 					console.log('No such document!');
	// 				}
	// 			}
	// 		} catch (error) {
	// 			toast.error('No user is signed in');
	// 		}
	// 	});

	// 	// Cleanup subscription on unmount
	// 	return () => unsubscribe();
	// }, []);

	const [problems, setProblems] = useState([]);
	const [filteredProblems, setFilteredProblems] = useState([]);

	useEffect(() => {
		async function getProblems() {
			try {
				const response = await fetch(`http://localhost:5050/problem/`);
				if (!response.ok) {
					throw new Error(`An error occurred: ${response.statusText}`);
				}
				const problems = await response.json();
				setProblems(problems);
				setFilteredProblems(problems); // Initialize filtered problems with all problems
			} catch (error) {
				console.error(error);
			}
		}
		getProblems();
	}, []);

	return (
		<>
			<div className='flex min-h-screen w-full flex-col'>
				{/* <Topbar />
				<Sidebar /> */}
				<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16'>
					<Card x-chunk='dashboard-01-chunk-0'>
						<CardHeader className='flex flex-row items-center justify-between text-white bg-black'></CardHeader>
						<CardContent className='flex flex-1 flex-col text-white bg-black'>
							<div className='container relative w-full h-[200px]'>
								<Spline scene='https://prod.spline.design/8rK8Mhnerno7UApB/scene.splinecode' />
								<div className='text-layer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full justify-between'>
									<p className='text-4xl font-bold mb-6'>Welcome username!</p>
									<div className='flex flex-row items-center justify-between text-white'>
										<div className='text-xl'>
											Track your progress, manage your courses activity and
											conversion
										</div>

										<div className='flex items-center'>
											<DateButton />
											<button className='flex items-center bg-black border border-white rounded-md text-white text-sm p-3 ml-2'>
												<svg
													width='24px'
													height='24px'
													viewBox='0 0 24 24'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
													<g
														id='SVGRepo_tracerCarrier'
														strokeLinecap='round'
														strokeLinejoin='round'
													></g>
													<g id='SVGRepo_iconCarrier'>
														{' '}
														<path
															d='M4 12H20M12 4V20'
															stroke='#ffffff'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
														></path>
													</g>
												</svg>
												<a href='/courses' className='ml-2'>
													Learn new skills
												</a>
											</button>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
						<Card x-chunk='dashboard-01-chunk-0'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2  '>
								<CardTitle className='text-sm font-medium'>
									Total Problems solved
								</CardTitle>
								<Code2 className='h-4 w-4  ' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold  '>132</div>
								<p className='text-2xs   mt-2'>+20.1% from last month</p>
							</CardContent>
						</Card>
						<Card x-chunk='dashboard-01-chunk-1'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2  '>
								<CardTitle className='text-sm font-medium'>
									Lessons completed
								</CardTitle>
								<BookMarked className='h-4 w-4   mt-2' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold  '>12</div>
								<p className='text-2xs  '>+180.1% from last month</p>
							</CardContent>
						</Card>
						<Card x-chunk='dashboard-01-chunk-2'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium  '>
									Average learning time
								</CardTitle>
								<CreditCard className='h-4 w-4  ' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold  '>3.2 hours</div>
								<p className='text-2xs   mt-2'>+19% from last month</p>
							</CardContent>
						</Card>
						<Card x-chunk='dashboard-01-chunk-3'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium  '>
									Longest streak
								</CardTitle>
								<Activity className='h-4 w-4  ' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold  '>29 days</div>
								<p className='text-2xs   mt-2'>Best since last month</p>
							</CardContent>
						</Card>
					</div>
					<div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
						<Card className='xl:col-span-2  ' x-chunk='dashboard-01-chunk-4'>
							<CardHeader className='flex flex-row items-center'>
								<div className='grid gap-2'>
									<CardTitle>Problems</CardTitle>
									<CardDescription>Most recent problems.</CardDescription>
								</div>
								<Button asChild size='sm' className='ml-auto gap-1'>
									<a href='/problems'>
										View All
										<ArrowUpRight className='h-4 w-4' />
									</a>
								</Button>
							</CardHeader>
							<CardContent>
								<div className='flex flex-col space-y-2 overflow-y-auto max-h-[320px]'>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</TableHead>
												<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</TableHead>
												<TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Difficulty</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredProblems.map((problem) => (
												<Problem
													problem={problem}
													key={problem._id}
												/>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
						<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
							<CardHeader>
								<CardTitle>Learn Essential Coding Skills</CardTitle>
								<CardDescription>
									<p className='mt-2'>
										The Coding courses listed cover a spectrum from beginner to
										advanced. learners can elevate their proficiency in software
										engineering, data science, AI technologies, and website
										construction.
									</p>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<a href='/courses'>
									<div className="grid gap-2 w-full h-[280px] place-items-center bg-[url('https://media.istockphoto.com/id/1406263653/nl/vector/dark-blue-abstract-with-colorful-light-for-background.jpg?s=612x612&w=0&k=20&c=q_hOjh_XpzA4ZxaApExc7CBbAtW3Se2hw7ZxlvDfujw=')] bg-cover rounded">
										<svg
											width='300px'
											height='300px'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
											<g
												id='SVGRepo_tracerCarrier'
												strokeLinecap='round'
												strokeLinejoin='round'
											></g>
											<g id='SVGRepo_iconCarrier'>
												<path
													d='M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16'
													stroke='#ffffff'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												></path>
											</g>
										</svg>
									</div>
								</a>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</>
	);
};

export default MainHome;

const Problem = ({ problem }) => {
	// Function to determine difficulty color class based on the level
	const getDifficultyColorClass = (difficulty) => {
		switch (difficulty) {
			case "Easy":
				return "text-green-600"; // Green color for Easy
			case "Medium":
				return "text-yellow-600"; // Yellow color for Medium
			case "Hard":
				return "text-red-600"; // Red color for Hard
			default:
				return "text-gray-600"; // Default to gray if no match
		}
	};

	return (
		<tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer">
			<td className="p-4 align-middle">
				<Link to={`/problems/edit/${problem._id}`} className="block">
					{problem.title}
				</Link>
			</td>
			<td className="p-4 align-middle">
				<Link to={`/problems/edit/${problem._id}`} className="block">
					{problem.type}
				</Link>
			</td>
			<td className={`p-4 align-middle ${getDifficultyColorClass(problem.difficulty)}`}>
				<Link to={`/problems/edit/${problem._id}`} className="block">
					{problem.difficulty}
				</Link>
			</td>
		</tr>
	);
};

