import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Triangle, MoreHorizontal, ThumbsUp, MessageSquare, Send, Bookmark, Link, Bell, Eye, EyeOff, AlertTriangle, User, MessageCircle, Image } from "lucide-react"
import { CreatePostDialog } from '@/container/Community/components/createPost_btn';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import SocialMediaCard from '@/container/Community/components/postCard'

export default function MainFeed() {
	const channels = [
		{ name: "General", icon: "🌐" },
		{ name: "Introductions", icon: "👋" },
		{ name: "Python", icon: "🐍" },
		{ name: "JavaScript", icon: "🟨" },
		{ name: "Web Dev", icon: "🌐" },
		{ name: "Career", icon: "💼" },
		{ name: "Memes", icon: "😂" },
		{ name: "#30NitesOfCode", icon: "🌙" },
		{ name: "Pets", icon: "🐾" },
		{ name: "Checkpoint", icon: "🏁" },
		{ name: "Final Project", icon: "🏆" },
	]

	const techNews = [
		{ title: "Google's AI going nuclear", date: "October 14", image: "https://i.cdn.newsbytesapp.com/images/l24720241015094856.jpeg" },
		{ title: "X is Back in Brazil 🇧🇷", date: "October 9", image: "https://media.wired.com/photos/66fc3d26968176ff6a71b810/master/w_2560%2Cc_limit/X-Back-in-Brazil-Business-2175241189.jpg" },
		{ title: "Satoshi Found? New Bitcoin Documentary", date: "October 4", image: "https://coincierge.de/wp-content/uploads/2024/09/Krypto-News-Irre-Analyse-Bitcoin-Erfinder-Satoshi-Nakamoto-%E2%80%93-in-Wirklichkeit-die-CIA-coincierge-696x392.jpg" },
	]

	const events = [
		{ title: "Club Exclusive LinkedIn Review", date: "Wed Oct 23rd @ 3:00pm ET", month: "OCT", day: "23", color: "#0c417b" },
		{ title: "Hacker House Office Hours w/ Team", date: "Tue Oct 29th @ 2:00pm ET", month: "OCT", day: "29", color: "#047d4c" },
	]

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [newComment, setNewComment] = useState("")
	const [comments, setComments] = useState([
		{ id: 1, author: "James William", content: "Great job on your first React project!" },
		{ id: 2, author: "Alice Smith", content: "I'd love to see the code. Is it open source?" }
	])

	const handleAddComment = () => {
		if (newComment.trim()) {
			setComments([...comments, { id: comments.length + 1, author: "Current User", content: newComment }])
			setNewComment("")
		}
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="border-b px-4 py-2 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className='ml-4'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='outline' size='icon' aria-label='Home'>
										<Triangle className='size-5 fill-foreground' />
									</Button>
								</TooltipTrigger>
								<TooltipContent side='bottom' sideOffset={5}>
									<p>CodeHub</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<h1 className="text-2xl font-bold">CodeHub</h1>
					<nav className="hidden md:flex space-x-4">
						<Button variant="ghost">Learn</Button>
						<Button variant="ghost">Practice</Button>
						<Button variant="ghost">Build</Button>
						<Button variant="ghost">Community</Button>
					</nav>
				</div>
				<div className="flex items-center space-x-4">
					<Button variant="outline">Join Club</Button>
					<Bell className="h-6 w-6" />
					<User className="h-6 w-6" />
				</div>
			</header>
			<div className="flex">
				<aside className="w-64 border-r p-4 hidden md:block">
					<div className="mb-4">
						<Button variant="ghost" className="w-full justify-start">
							<User className="mr-2 h-4 w-4" /> My Posts
						</Button>
					</div>
					<div className="mb-4">
						<Button variant="ghost" className="w-full justify-start">
							<MessageCircle className="mr-2 h-4 w-4" /> Town Square
						</Button>
					</div>
					<div className="mb-4">
						<h3 className="font-semibold mb-2">Channels</h3>
						{channels.map((channel) => (
							<Button key={channel.name} variant="ghost" className="w-full justify-start mb-1">
								<span className="mr-2">{channel.icon}</span> {channel.name}
							</Button>
						))}
					</div>
					<CreatePostDialog trigger={<Button className="w-full">Create Post</Button>} />
				</aside>
				<main className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
					<div className="mb-4 relative">
						<div className="w-full h-60 overflow-hidden rounded-lg bg-muted">
							<img
								src="https://i.pinimg.com/originals/24/41/da/2441dacfd5703b140a2816f82bd0f9c7.gif"
								alt="Pixel Art Landscape"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="absolute bottom-4 left-4">
							<h2 className="text-3xl font-bold text-white">General</h2>
							<p className="text-muted-foreground text-white">Community-wide conversations</p>
						</div>
						<div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex items-center">
							<span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
							250 Online Now
						</div>
					</div>
					<Card className="mb-4">
						<CardContent className="p-4">
							<div className="flex items-center space-x-2 mb-2">
								<img src="https://avatars.githubusercontent.com/u/133557378?v=4" alt="User" className="rounded-full h-10 w-10" />
								<CreatePostDialog trigger={<div className='w-full'>
									<Input
										className="flex-1"
										placeholder="You need to reach 250 XP to make a post."
									/></div>} />
							</div>
							<div className="flex justify-between items-center">
								<CreatePostDialog trigger={<Button variant="ghost" size="sm">
									<Image className="mr-2 h-4 w-4" /> Add Image
								</Button>} />
								<Button size="sm" disabled>Post</Button>
							</div>
						</CardContent>
					</Card>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Card className="mb-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
								<CardContent className="p-4">
									<div className="flex justify-between items-center mb-4">
										<div className="flex items-center space-x-2">
											<img src="https://i.pinimg.com/564x/58/12/ef/5812effe012750b911f72fba0525cd27.jpg" className="rounded-full h-10 w-10" />
											<div>
												<h3 className="font-semibold">Jane Doe 👩‍💻</h3>
												<p className="text-sm text-muted-foreground">@jane_codes • 5h ago</p>
											</div>
										</div>
										<Popover>
											<PopoverTrigger asChild>
												<Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-60 bg-white text-black border border-gray-200 shadow-lg" align="end">
												<div className="space-y-2">
													<Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
														<Bookmark className="mr-2 h-4 w-4" /> Save video
													</Button>
													<Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
														<Link className="mr-2 h-4 w-4" /> Copy link
													</Button>
													<Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
														<Bell className="mr-2 h-4 w-4" /> Turn on notifications
													</Button>
													<Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
														<EyeOff className="mr-2 h-4 w-4" /> Hide post
													</Button>
													<Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
														<Eye className="mr-2 h-4 w-4" /> Hide all from Jane Doe
													</Button>
													<Button variant="ghost" className="w-full justify-start text-black hover:text-black hover:bg-gray-100">
														<AlertTriangle className="mr-2 h-4 w-4" /> Report
													</Button>
												</div>
											</PopoverContent>
										</Popover>
									</div>
									<p className="mb-2">Just finished my first React project! It's a simple todo app, but I'm really proud of it. Check it out and let me know what you think!</p>
									<a href="/" className="text-primary hover:underline">https://github.com/jane_codes/react-todo-app</a>
									<div className="flex items-center mt-4 space-x-4">
										<Button variant="ghost" size="sm">
											<ThumbsUp className="mr-2 h-4 w-4" /> 28 Likes
										</Button>
										<Button variant="ghost" size="sm">
											<MessageSquare className="mr-2 h-4 w-4" /> {comments.length} Comments
										</Button>
									</div>
								</CardContent>
							</Card>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Comments</DialogTitle>
							</DialogHeader>
							<div className="max-h-[300px] overflow-y-auto">
								{comments.map((comment) => (
									<div key={comment.id} className="mb-4">
										<p className="font-semibold">{comment.author}</p>
										<p>{comment.content}</p>
									</div>
								))}
							</div>
							<div className="flex items-center mt-4">
								<Input
									placeholder="Write a comment..."
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									className="flex-grow mr-2"
								/>
								<Button onClick={handleAddComment}>
									<Send className="h-4 w-4" />
								</Button>
							</div>
						</DialogContent>
					</Dialog>
					<Card className="mb-4">
						<CardContent className="p-4">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center space-x-2">
									<img src="https://avatars.githubusercontent.com/u/133557378?v=4" className="rounded-full h-10 w-10" />
									<div>
										<h3 className="font-semibold">TrongNghia 🔥</h3>
										<p className="text-sm text-muted-foreground">@TrongNghiaa • 10h ago</p>
									</div>
								</div>
								<Button variant="ghost" size="sm">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</div>
							<h4 className="text-xl font-semibold mb-2">Changelog this week (21/10 - 27-10)</h4>
							<img
								src="/src/assets/cover.png"
								alt="Changelog"
								className="w-full rounded-lg mb-2"
							/>
							<p className="text-muted-foreground">What we'll build</p>
							<div className="flex items-center mt-4 space-x-4">
								<Button variant="ghost" size="sm">
									<ThumbsUp className="mr-2 h-4 w-4" /> 28 Likes
								</Button>
								<Button variant="ghost" size="sm">
									<MessageSquare className="mr-2 h-4 w-4" /> 7 Comments
								</Button>
							</div>
						</CardContent>
					</Card>
					<SocialMediaCard />
					<Card className="mb-4">
						<CardContent className="p-4">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center space-x-2">
									<img src="https://i.pinimg.com/enabled_lo/564x/af/2e/45/af2e450dee86885b777c32b584f15ed5.jpg" className="rounded-full h-10 w-10" />
									<div>
										<h3 className="font-semibold">John Smith 🚀</h3>
										<p className="text-sm text-muted-foreground">@johnsmith • 2h ago</p>
									</div>
								</div>
								<Button variant="ghost" size="sm">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</div>
							<p className="mb-2">Quick poll: What's your favorite programming language and why?</p>
							<div className="space-y-2">
								<Button variant="outline" className="w-full justify-start">Python</Button>
								<Button variant="outline" className="w-full justify-start">JavaScript</Button>
								<Button variant="outline" className="w-full justify-start">Java</Button>
								<Button variant="outline" className="w-full justify-start">C++</Button>
							</div>
							<div className="flex items-center mt-4 space-x-4">
								<Button variant="ghost" size="sm">
									<ThumbsUp className="mr-2 h-4 w-4" /> 15 Likes
								</Button>
								<Button variant="ghost" size="sm">
									<MessageSquare className="mr-2 h-4 w-4" /> 32 Comments
								</Button>
							</div>
						</CardContent>
					</Card>
				</main>
				<aside className="w-80 p-4 hidden lg:block border-l">
					<Card className="mb-4">
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								<span>Tech News</span>
								<Button variant="link" size="sm">See all</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{techNews.map((news, index) => (
								<div key={index} className="flex items-center space-x-2 mb-2">
									<img src={news.image} alt={news.title} className="w-12 h-12 rounded object-cover" />
									<div>
										<h4 className="font-semibold">{news.title}</h4>
										<p className="text-sm text-muted-foreground">{news.date}</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								<span>Upcoming Events</span>
								<Button variant="link" size="sm">See all</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{events.map((event, index) => (
								<div key={index} className="flex items-center space-x-2 mb-2">
									<div
										className="p-2 rounded text-center"
										style={{
											backgroundColor: event.color,
											color: '#ffffff',
										}}
									>
										<div className="text-xs">{event.month}</div>
										<div className="text-lg font-bold">{event.day}</div>
									</div>
									<div>
										<h4 className="font-semibold">{event.title}</h4>
										<p className="text-sm text-muted-foreground">{event.date}</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</aside>
			</div>
		</div>
	)
}