import Sidebar from '@/components/Admin/Sidebar';
import { ListFilter, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const Admin_Lectures = () => {
	// Lectures List
	const [lecturesList, setLecturesList] = useState([]);
	useEffect(() => {
		(async () => {
			const data = await getDocs(collection(firestore, 'Lectures'));
			const lecturesList = data.docs.map(doc => doc.data());
			setLecturesList(lecturesList);
		})();
	});

	// Add Lectures
	const [title, setTitle] = useState('');
	const [language, setLanguage] = useState('');
	const [language_short, setLanguage_short] = useState('');
	const [author, setAuthor] = useState('');
	const [video_num, setVideo_num] = useState('');
	const [image_cover, setImage_cover] = useState('');
	const [video_link, setVideo_link] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		const newLectures = {
			title,
			language,
			language_short,
			author,
			video_num,
			image_cover,
			video_link,
		};

		try {
			const lecturesRef = doc(collection(firestore, 'Lectures'));
			await addDoc(collection(firestore, 'Lectures'), newLectures);
		} catch (error) {
			console.error('Error adding document: ', error);
		}

		setTitle('');
		setLanguage('');
		setLanguage_short('');
		setAuthor('');
		setVideo_num('');
		setImage_cover('');
		setVideo_link('');
	};

	// Delete Lectures
	const [isDeleted, setIsDeleted] = useState(false);

	const deleteDocument = async title => {
		try {
			const colRef = collection(firestore, 'Lectures');
			const q = query(colRef, where('title', '==', title));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async doc => {
				await deleteDoc(doc.ref);
			});
			setIsDeleted(true);
			toast('Delete lecture successed! 🎉');
		} catch (error) {
			toast('Error deleting document:', error);
		}
	};

	return (
		<div className='flex min-h-screen w-full flex-col '>
			<Sidebar />
			{/* Mainbar */}
			<main className='flex flex-1 items-center flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16'>
				<Tabs defaultValue='all'>
					<div className='flex items-center'>
						<div className='ml-auto flex items-center gap-2'>
							<div className='hidden'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='outline' size='sm' className='h-8 gap-1'>
											<ListFilter className='h-3.5 w-3.5' />
											<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
												Filter
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuLabel>Filter by</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>
											Title
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Language
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Author</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<Dialog>
								<DialogTrigger asChild>
									<Button size='lg' className='h-8 gap-1'>
										<PlusCircle className='h-3.5 w-3.5' />
										<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
											Add
										</span>
									</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-[425px]'>
									<DialogHeader>
										<DialogTitle>
											<h1 className='text-center'>Add new Lecture</h1>
										</DialogTitle>
									</DialogHeader>
									<form
										onSubmit={handleSubmit}
										className='flex flex-col space-y-4'
									>
										<div className='grid gap-4 py-4'>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='title' className='text-right'>
													Title
												</Label>
												<Input
													id='title'
													type='text'
													value={title}
													onChange={e => setTitle(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='language' className='text-right'>
													Language
												</Label>
												<Input
													id='language'
													value={language}
													onChange={e => setLanguage(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='language_short' className='text-right'>
													Language (short)
												</Label>
												<Input
													id='language_short'
													value={language_short}
													onChange={e => setLanguage_short(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='author' className='text-right'>
													Author
												</Label>
												<Input
													id='author'
													value={author}
													onChange={e => setAuthor(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='video_num' className='text-right'>
													Number of videos
												</Label>
												<Input
													id='video_num'
													value={video_num}
													onChange={e => setVideo_num(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='image_cover' className='text-right'>
													Cover Image's link
												</Label>
												<Input
													id='image_cover'
													value={image_cover}
													onChange={e => setImage_cover(e.target.value)}
													className='col-span-3'
												/>
											</div>
											<div className='grid grid-cols-4 items-center gap-4'>
												<Label htmlFor='video_link' className='text-right'>
													Video's Link
												</Label>
												<Input
													id='video_link'
													value={video_link}
													onChange={e => setVideo_link(e.target.value)}
													className='col-span-3'
												/>
											</div>
										</div>
										<Button type='submit'>Add lecture</Button>
									</form>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					<TabsContent value='all'>
						<Card x-chunk='dashboard-06-chunk-0'>
							<CardHeader>
								<h1 className=' text-3xl font-medium'>Lectures</h1>
								<CardDescription>
									<h1 className=' text-sm font-medium'>
										Level up your coding abilities! Explore Lectures designed
										for all skill sets, from beginner to advanced.
									</h1>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className=''>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Title</TableHead>
												<TableHead>Language</TableHead>
												<TableHead>Author</TableHead>
												<TableHead>Video_link</TableHead>
												<TableHead>Action</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{lecturesList.map((item, index) => (
												<TableRow key={index}>
													<TableCell>
														<div className='font-medium'>{item.title}</div>
													</TableCell>
													<TableCell>
														<div className='font-medium'>{item.language}</div>
													</TableCell>
													<TableCell>
														<div className='font-medium'>{item.author}</div>
													</TableCell>
													<TableCell>
														<div className='font-medium'>{item.video_link}</div>
													</TableCell>
													<TableCell>
														<button
															className='bg-red-500 text-white hover:bg-red-700  font-bold py-2 px-4 rounded'
															onClick={() => deleteDocument(item.title)}
														>
															Delete
														</button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
							<CardFooter>
								<div className='text-xs text-muted-foreground'>
									Showing <strong>{lecturesList.length}</strong> of{' '}
									<strong>{lecturesList.length}</strong> Total Problems
								</div>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
};
export default Admin_Lectures;
