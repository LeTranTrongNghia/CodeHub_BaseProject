import Sidebar from '@/components/MainHome/Sidebar';
import Topbar from '@/components/MainHome/Topbar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const Profile = () => {
	const [activeMenu, setActiveMenu] = useState('General');

	const handleMenuClick = menu => {
		setActiveMenu(menu);
	};

	const [id, setId] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [createAt, setCreateAt] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			try {
				if (user) {
					const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						setId(userData.id);
						setUsername(userData.display_name);
						setEmail(userData.email);
					} else {
						console.log('No such document!');
					}
				}
			} catch (error) {
				toast.error('No user is signed in');
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	return (
		<div className='flex min-h-screen w-full flex-col'>
			{/* Topbar */}
			<Topbar />
			{/* Sidebar */}
			<Sidebar />
			{/* Main */}
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Settings</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<div
						className='grid gap-4 text-sm text-muted-foreground'
						x-chunk='dashboard-04-chunk-0'
					>
						<a
							href='#'
							className={`${
								activeMenu === 'General' ? 'font-semibold text-primary' : ''
							}`}
							onClick={() => handleMenuClick('General')}
						>
							General
						</a>
						<a
							href='/contact'
							className={`${
								activeMenu === 'Support' ? 'font-semibold text-primary' : ''
							}`}
							onClick={() => {
								handleMenuClick('Support');
							}}
						>
							Support
						</a>
					</div>
					<div className='grid gap-6'>
						<Card x-chunk='dashboard-04-chunk-1'>
							<CardHeader>
								<CardTitle>Accout infomation</CardTitle>
								<CardDescription>
									Used to identify your account.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='rounded-md border mb-4 px-4 py-3 font-mono text-sm'>
									<h1 className='font-bold'>ID: </h1>
									{id}
								</div>
								<div className='rounded-md border my-4 px-4 py-3 font-mono text-sm'>
									<h1 className='font-bold'>Username: </h1>
									{username}
								</div>
								<div className='rounded-md border my-4 px-4 py-3 font-mono text-sm'>
									<h1 className='font-bold'>Email: </h1>
									{email}
								</div>
							</CardContent>
							<CardFooter className='border-t px-6 py-4 hidden'>
								<Button>Save</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Profile;
