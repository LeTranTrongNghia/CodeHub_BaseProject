import {
	Activity,
	ArrowUpRight,
	CreditCard,
	Code2,
	BookMarked
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import React from 'react';
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import DateButton from "@/components/MainHome/DateButton";
import Spline from '@splinetool/react-spline';

const MainHome = () => {

	return <div className="flex min-h-screen w-full flex-col bg-black">
		{/* Topbar */}
		<Topbar />
		{/* Sidebar */}
		<Sidebar />
		{/* Mainbar */}
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16">
			<Card x-chunk="dashboard-01-chunk-0">
				<CardHeader className="flex flex-row items-center justify-between text-white">
				</CardHeader>
				<CardContent className="flex flex-1 flex-col text-white">
					<div className="container relative w-full h-[200px]">
						<Spline scene="https://prod.spline.design/8rK8Mhnerno7UApB/scene.splinecode"/>
						<div className="text-layer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full justify-between">
							<p className="text-4xl font-bold font-medium mb-6">Welcome back, Ivel!</p>
							<div className="flex flex-row items-center justify-between text-white">
								<div className="text-xl">Track your progress, manage your courses activity and conversion</div>

								<div className="flex items-center">
									<DateButton />
									<button className="flex items-center bg-black border border-white rounded-md text-white text-sm p-3 ml-2 hover:bg-blue-400">
										<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
										<p className="ml-2">Add course</p>
									</button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Card x-chunk="dashboard-01-chunk-0">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
						<CardTitle className="text-sm font-medium">
							Total Problems solved
						</CardTitle>
						<Code2 className="h-4 w-4 text-white" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-white">132</div>
						<p className="text-2xs text-white mt-2">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-1">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
						<CardTitle className="text-sm font-medium">
							Lessons completed
						</CardTitle>
						<BookMarked className="h-4 w-4 text-white mt-2" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-white">12</div>
						<p className="text-2xs text-white">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-white">Average learning time</CardTitle>
						<CreditCard className="h-4 w-4 text-white" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-white">3.2 hours</div>
						<p className="text-2xs text-white mt-2">
							+19% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-white">Longest streak</CardTitle>
						<Activity className="h-4 w-4 text-white" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-white">29 days</div>
						<p className="text-2xs text-white mt-2">
							Best since last month
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card
					className="xl:col-span-2 text-white" x-chunk="dashboard-01-chunk-4"
				>
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Problems</CardTitle>
							<CardDescription>
								Most recent problems.
							</CardDescription>
						</div>
						<Button asChild size="sm" className="ml-auto gap-1">
							<div href="#">
								View All
								<ArrowUpRight className="h-4 w-4" />
							</div>
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Type</TableHead>
									<TableHead className="text-right">Difficulty</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										<div className="font-medium"
											onClick={() => window.location.href = "/coding"}>
											Reverse a String
										</div>
									</TableCell>
									<TableCell>
										String
									</TableCell>
									<TableCell className="text-right">Easy</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Longest Substring Without Repeating Characters</div>
									</TableCell>
									<TableCell>
										String
									</TableCell>
									<TableCell className="text-right">Medium</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Integer to Roman</div>
									</TableCell>
									<TableCell>
										Hash Table
									</TableCell>
									<TableCell className="text-right">Medium</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Regular Expression Matching</div>
									</TableCell>
									<TableCell>
										Dynamic Programming
									</TableCell>
									<TableCell className="text-right">Hard</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Multiply Strings</div>
									</TableCell>
									<TableCell>
										Math
									</TableCell>
									<TableCell className="text-right">Medium</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card
					className="overflow-hidden text-white" x-chunk="dashboard-07-chunk-4"
				>
					<CardHeader>
						<CardTitle>Grand Coding Contest</CardTitle>
						<CardDescription >
							<p className="mt-2">Biggest Coding Contest | Prizes Worth 1 Million $ | Grand Coding Contest World Wide</p>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-2 w-full h-[280px] place-items-center bg-[url('https://media.istockphoto.com/id/1406263653/nl/vector/dark-blue-abstract-with-colorful-light-for-background.jpg?s=612x612&w=0&k=20&c=q_hOjh_XpzA4ZxaApExc7CBbAtW3Se2hw7ZxlvDfujw=')] bg-cover rounded">
							<svg width="300px" height="300px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	</div>
}

export default MainHome;