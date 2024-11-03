import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Image } from "lucide-react"
import { CreatePostDialog } from '@/container/Community/components/createPost_btn';
import { useNavigate } from 'react-router-dom';
import ChannelsSidebar from './components/ChannelsSidebar'
import EventsSidebar from './components/EventsSidebar'
import HeaderCommunity from './components/HeaderCommunity'
import ChannelOverview from './components/ChannelOverview';
import NewsCard from './components/NewsCard';

export default function MainFeed() {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-background text-foreground">
			<HeaderCommunity />
			<div className="flex">
				<ChannelsSidebar />
				<main className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
					<ChannelOverview
						title="General"
						description="Community-wide conversations"
						onlineCount={250}
						imageUrl="https://i.pinimg.com/originals/24/41/da/2441dacfd5703b140a2816f82bd0f9c7.gif"
					/>
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

					<NewsCard
						author="Jane Doe 👩‍💻"
						username="jane_codes"
						timeAgo="5h ago"
						content={`Just finished my first React project! It's a simple todo app, but I'm really proud of it. Check it out and let me know what you think!\nhttps://github.com/jane_codes/react-todo-app`}
						avatarURL="https://i.pinimg.com/564x/58/12/ef/5812effe012750b911f72fba0525cd27.jpg"
						imageUrl=""
						likes={28}
						comments={3}
						onClick={() => navigate('/community/post/detail')}
					/>

					<NewsCard
						author="TrongNghia 🔥"
						username="TrongNghiaa"
						timeAgo="10h ago"
						content="Changelog this week (21/10 - 27-10)"
						avatarURL="https://avatars.githubusercontent.com/u/133557378?v=4"
						imageUrl="/src/assets/cover.png"
						likes={28}
						comments={7}
						onClick={() => navigate('/community/post/detail')}
					/>

					<NewsCard
						author="John Smith 🚀"
						username="johnsmith"
						timeAgo="2h ago"
						content="Quick poll: What's your favorite programming language and why?"
						avatarURL="https://i.pinimg.com/enabled_lo/564x/af/2e/45/af2e450dee86885b777c32b584f15ed5.jpg"						
						likes={15}
						comments={32}
						poll={["Python", "JavaScript", "Ruby", "Go"]}
						onClick={() => navigate('/community/post/detail')}
					/>
				</main>
				<EventsSidebar />
			</div>
		</div>
	)
}