{/* Topbar */}
<Topbar />
{/* Sidebar */}
<Sidebar />
{/* Mainbar */}
<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16">
	<Tabs defaultValue="all">
		<div className="flex items-center">
			<div className="ml-auto flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm" className="h-8 gap-1">
							<ListFilter className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Filter
							</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Filter by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>Title</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Difficulty</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Type</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button size="sm" className="h-8 gap-1">
					<Shuffle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Random one
					</span>
				</Button>
			</div>
		</div>
		<TabsContent value="all">
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<h1 className="text-white text-3xl font-medium">Problems</h1>
					<CardDescription>
						Level up your coding abilities! Explore problems designed for all skill sets, from beginner to advanced.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Difficulty</TableHead>
								<TableHead className="hidden md:table-cell">
									type
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="hidden sm:table-cell">
									<div className="w-[64px] h-[64px] bg-[url('https://t4.ftcdn.net/jpg/02/67/40/21/360_F_267402109_jZvsqRQUvSxohAOmcUt549jlapqoRHM0.jpg')] bg-cover rounded"></div>
								</TableCell>
								<TableCell className="font-medium text-white">
									Longest Substring Without Repeating Characters
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={"text-yellow-300"}>Medium</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell text-white">
									String
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="hidden sm:table-cell">
									<div className="w-[64px] h-[64px] bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MDQtbnVubnktMDE2XzIuanBn.jpg')] bg-cover rounded"></div>
								</TableCell>
								<TableCell className="font-medium text-white">
									Integer to Roman
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={"text-green-300"}>Easy</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell text-white">
									Hash Table
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="hidden sm:table-cell">
									<div className="w-[64px] h-[64px] bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1bECSkSfLAxMYgNaC-g7hyNdtomiFDIQ4PXPRysQ8FR94PIeor__iSCocIVtcNDgGUE&usqp=CAU')] bg-cover rounded"></div>
								</TableCell>
								<TableCell className="font-medium text-white">
									Regular Expression Matching
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={"text-red-300"}>Hard</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell text-white">
									Dynamic Programming
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="hidden sm:table-cell">
									<div className="w-[64px] h-[64px] bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MDQtbnVubnktMDE2XzIuanBn.jpg')] bg-cover rounded"></div>
								</TableCell>
								<TableCell className="font-medium text-white">
									Permutation Sequence
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={"text-red-300"}>Hard</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell text-white">
									Math
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-4</strong> of <strong>321</strong>{" "}
						products
					</div>
				</CardFooter>
			</Card>
		</TabsContent>
	</Tabs>
	<div class="container flex max-w-5xl flex-col items-center gap-5 text-center">
			<Button asChild size="sm">
				<a href="">
					<span class="mr-3">🎉</span> Introducing on{" "}
					<Github className="ml-3 h-5 w-5" />
				</a>
			</Button>
			<h1
				class="text-balance text-white font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[66px]"
			>
				Kick off with a bang with{" "}
				{/* <span class="text-purple font-extrabold">

				</span> */}
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-700 font-extrabold">
					SaaS Starter
				</span>
			</h1>

			<p
				class="max-w-2xl text-white-800 text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
			>
				Build your next project using Next.js 14, Prisma, Planetscale, Auth.js v5,
				Resend, React Email, Shadcn/ui, Stripe.
			</p>
			<div class="flex justify-center space-x-2 md:space-x-4">
				<div class="relative inline-flex group">
					<div
						class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200">
					</div>
					<a href="" class="relative inline-flex items-center justify-center px-5 py-2 text-base font-bold text-white transition-all duration-200 bg-black border-2 border-transparent rounded">
						Learn more 
					</a>
				</div>
				<div class="relative inline-flex group">
					<div
						class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200">
					</div>
					<Button asChild size="sm">
						<a href="" class="relative inline-flex items-center justify-center px-5 py-2 text-base font-bold text-white transition-all duration-200 bg-black border-2 border-transparent rounded">
							<Github className="h-5 w-5 mr-3" />Star on Github
						</a>
					</Button>
				</div>
			</div>
		</div>
</main>

