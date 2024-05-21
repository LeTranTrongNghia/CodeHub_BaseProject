import DateButton from '@/components/MainHome/DateButton';
import Sidebar from '@/components/MainHome/Sidebar';
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
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

const MainHome = () => {
	const [problemList, setProblemList] = useState([]);
	useEffect(() => {
		(async () => {
			const data = await getDocs(collection(firestore, 'Problems'));
			const problemLists = data.docs.map(doc => doc.data());
			setProblemList(problemLists);
		})();
	});

	return (
		<div className='flex min-h-screen w-full flex-col bg-black'>
			{/* Topbar */}
			{/* <Topbar /> */}
			{/* Sidebar */}
			<Sidebar />
			{/* Mainbar */}
			<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16'>
				<Card x-chunk='dashboard-01-chunk-0'>
					<CardHeader className='flex flex-row items-center justify-between text-white'></CardHeader>
					<CardContent className='flex flex-1 flex-col text-white'>
						<div className='container relative w-full h-[200px]'>
							<Spline scene='https://prod.spline.design/8rK8Mhnerno7UApB/scene.splinecode' />
							<div className='text-layer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full justify-between'>
								<p className='text-4xl font-bold font-medium mb-6'>
									Welcome back, Ivel!
								</p>
								<div className='flex flex-row items-center justify-between text-white'>
									<div className='text-xl'>
										Track your progress, manage your courses activity and
										conversion
									</div>

									<div className='flex items-center'>
										<DateButton />
										<button className='flex items-center bg-black border border-white rounded-md text-white text-sm p-3 ml-2 hover:bg-blue-400'>
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
													></path>{' '}
												</g>
											</svg>
											<p className='ml-2'>Add course</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
					<Card x-chunk='dashboard-01-chunk-0'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 text-white'>
							<CardTitle className='text-sm font-medium'>
								Total Problems solved
							</CardTitle>
							<Code2 className='h-4 w-4 text-white' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-white'>132</div>
							<p className='text-2xs text-white mt-2'>+20.1% from last month</p>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-01-chunk-1'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 text-white'>
							<CardTitle className='text-sm font-medium'>
								Lessons completed
							</CardTitle>
							<BookMarked className='h-4 w-4 text-white mt-2' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-white'>12</div>
							<p className='text-2xs text-white'>+180.1% from last month</p>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-01-chunk-2'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-white'>
								Average learning time
							</CardTitle>
							<CreditCard className='h-4 w-4 text-white' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-white'>3.2 hours</div>
							<p className='text-2xs text-white mt-2'>+19% from last month</p>
						</CardContent>
					</Card>
					<Card x-chunk='dashboard-01-chunk-3'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-white'>
								Longest streak
							</CardTitle>
							<Activity className='h-4 w-4 text-white' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-white'>29 days</div>
							<p className='text-2xs text-white mt-2'>Best since last month</p>
						</CardContent>
					</Card>
				</div>
				<div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
					<Card
						className='xl:col-span-2 text-white'
						x-chunk='dashboard-01-chunk-4'
					>
						<CardHeader className='flex flex-row items-center'>
							<div className='grid gap-2'>
								<CardTitle>Problems</CardTitle>
								<CardDescription>Most recent problems.</CardDescription>
							</div>
							<Button asChild size='sm' className='ml-auto gap-1'>
								<div href='#'>
									View All
									<ArrowUpRight className='h-4 w-4' />
								</div>
							</Button>
						</CardHeader>
						<CardContent>
							<div className='flex flex-col space-y-2 overflow-y-auto max-h-[320px]'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Title</TableHead>
											<TableHead>Type</TableHead>
											<TableHead className='text-right'>Difficulty</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{problemList.map((item, index) => (
											<TableRow key={index}>
												<TableCell>
													<div
														className='font-medium'
														onClick={() => (window.location.href = '/coding')}
													>
														{item.title}
													</div>
												</TableCell>
												<TableCell>{item.type}</TableCell>
												<TableCell className='text-right'>
													{item.difficulty}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
					<Card
						className='overflow-hidden text-white'
						x-chunk='dashboard-07-chunk-4'
					>
						<CardHeader>
							<CardTitle>Grand Coding Contest</CardTitle>
							<CardDescription>
								<p className='mt-2'>
									Biggest Coding Contest | Prizes Worth 1 Million $ | Grand
									Coding Contest World Wide
								</p>
							</CardDescription>
						</CardHeader>
						<CardContent>
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
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
};

export default MainHome;
