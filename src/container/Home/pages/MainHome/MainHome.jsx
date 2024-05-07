import {
	Activity,
	ArrowUpRight,
	CircleUser,
	CreditCard,
	DollarSign,
	Menu,
	Package2,
	Search,
	Users,
	Bird,
	Book,
	Bot,
	Code2,
	CornerDownLeft,
	LifeBuoy,
	Mic,
	Paperclip,
	Rabbit,
	Settings,
	Settings2,
	Share,
	SquareTerminal,
	SquareUser,
	Triangle,
	Turtle,
	BookMarked
} from "lucide-react"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
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
import React, { useState } from 'react';
import DateButton from "@/components/MainHome/DateButton";

const MainHome = () => {

	return <div className="flex min-h-screen w-full flex-col">
		{/* Topbar */}
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<h1 className="ml-16 text-xl font-semibold">Explore</h1>
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
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<div
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</div>
						<div href="#" className="hover:text-foreground">
							Dashboard
						</div>
						<div
							href="#"
							className="text-muted-foreground hover:text-foreground"
						>
							Orders
						</div>
						<div
							href="#"
							className="text-muted-foreground hover:text-foreground"
						>
							Products
						</div>
						<div
							href="#"
							className="text-muted-foreground hover:text-foreground"
						>
							Customers
						</div>
						<div
							href="#"
							className="text-muted-foreground hover:text-foreground"
						>
							Analytics
						</div>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
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
		<aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
			<div className="p-2 mt-1">
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
								className="rounded-lg bg-muted"
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
								className="rounded-lg"
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
								className="rounded-lg"
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
								className="rounded-lg"
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
								className="rounded-lg"
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
								className="mt-auto rounded-lg"
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
		{/* Mainbar */}
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16">
			<Card x-chunk="dashboard-01-chunk-0">
				<CardHeader className="flex flex-row items-center justify-between bg">
					<CardTitle className="text-sm font-medium">
						<p className="text-2xl font-bold">Welcome back, Ivel!</p>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-row items-center justify-between">
					<div className="text-xl">Track your progress, manage your courses activity and conversion</div>
					<div className="flex items-center">
						<DateButton />
						<button className="bg-green-400 p-3 rounded-md hover:bg-green-300 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-black text-sm">
							Add course +
						</button>
					</div>
				</CardContent>
			</Card>
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Card x-chunk="dashboard-01-chunk-0">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Problems solved
						</CardTitle>
						<Code2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">132</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-1">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Lessons completed
						</CardTitle>
						<BookMarked className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12</div>
						<p className="text-xs text-muted-foreground">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Average learning time</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3.2 hours</div>
						<p className="text-xs text-muted-foreground">
							+19% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Longest streak</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">29 days</div>
						<p className="text-xs text-muted-foreground">
							Best since last month
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card
					className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
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
					className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
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