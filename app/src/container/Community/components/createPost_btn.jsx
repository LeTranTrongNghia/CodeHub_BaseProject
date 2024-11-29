import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Image,
	Users,
	Smile,
	MapPin,
	Gift,
	MoreHorizontal,
} from 'lucide-react';
import axios from 'axios';
import { HOST_DOMAIN_BE } from '@/helpers/domain';

export function CreatePostDialog({
	trigger,
	userData,
	currentChannelId,
	onPostCreated,
}) {
	const [postContent, setPostContent] = useState('');
	const [image, setImage] = useState('');
	const inputRef = useRef(null);
	const handlePostSubmit = async () => {
		if (!postContent) return; // Prevent empty posts

		const newPost = {
			author: userData.username,
			userID: userData._id,
			channelId: currentChannelId,
			timeAgo: new Date().toLocaleString(),
			content: postContent,
			avatarURL: userData.avatar || '',
			imageUrl: image,
			likes: [],
			comments: [],
			poll: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		try {
			const response = await fetch('http://localhost:5050/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPost),
			});

			if (!response.ok) {
				throw new Error('Failed to create post');
			}

			setPostContent(''); // Clear the textarea after submission
			onPostCreated(); // Call the refresh function
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	if (!userData) {
		return null;
	}

	const handleFileChange = async event => {
		try {
			const fileObj = event.target.files && event.target.files[0];
			// const fileObj = event.target.files;
			if (!fileObj) {
				return;
			}
			//  reset file input
			event.target.value = null;

			let formData = new FormData();
			// for (var i = 0; i < fileObj.length; i++) {
			// 	formData.append('image', fileObj[i]);
			// }
			formData.append('image', fileObj);
			const res = await axios.post(
				`${HOST_DOMAIN_BE}/upload/single`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			const result = res.data.data;
			setImage(result.imageUrl);
		} catch (error) {
			console.log('🚀 ~ handleFileChange ~ error:', error);
		}
	};

	const handleUploadImage = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] bg-background text-foreground p-0'>
				<DialogHeader className='pt-4'>
					<DialogTitle className='text-center text-xl font-bold'>
						Create post
					</DialogTitle>
				</DialogHeader>
				<div className='px-4'>
					<div className='flex items-center space-x-2 mb-4'>
						<Avatar>
							<AvatarImage
								src={userData.avatar}
								className='rounded-full h-10 w-10'
							/>
							<AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<div className='font-semibold'>{userData.username}</div>
							<Select defaultValue='public'>
								<SelectTrigger className='w-[110px] h-6 text-xs bg-muted border-none'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='public'>Public</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<Textarea
						placeholder="What's on your mind?"
						className='min-h-[150px] bg-transparent border text-lg resize-none placeholder:text-muted-foreground focus-visible:ring-0'
						value={postContent}
						onChange={e => setPostContent(e.target.value)}
					/>
				</div>
				<div className='p-4'>
					{/* Image Preview Section */}
					{image && (
						<div className='mb-4'>
							<img src={image} alt='Uploaded preview' className='w-full h-auto rounded' />
						</div>
					)}
					<div className='flex justify-between items-center mb-4'>
						<div className='text-sm font-semibold'>Add to your post</div>
						<input
							name='image'
							style={{ display: 'none' }}
							ref={inputRef}
							type='file'
							onChange={handleFileChange}
							multiple
						></input>
						<div className='flex space-x-2'>
							<Button
								variant='ghost'
								size='icon'
								className='hover:bg-muted'
								onClick={handleUploadImage}
							>
								<Image className='h-6 w-6' />
							</Button>
							{/* <Button variant='ghost' size='icon' className='hover:bg-muted'>
								<Users className='h-6 w-6' />
							</Button>
							<Button variant='ghost' size='icon' className='hover:bg-muted'>
								<Smile className='h-6 w-6' />
							</Button>
							<Button variant='ghost' size='icon' className='hover:bg-muted'>
								<MapPin className='h-6 w-6' />
							</Button>
							<Button variant='ghost' size='icon' className='hover:bg-muted'>
								<Gift className='h-6 w-6' />
							</Button>
							<Button variant='ghost' size='icon' className='hover:bg-muted'>
								<MoreHorizontal className='h-6 w-6' />
							</Button> */}
						</div>
					</div>
					<Button
						className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
						onClick={handlePostSubmit}
					>
						Post
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
