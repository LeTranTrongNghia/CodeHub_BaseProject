import { CircleUser, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Topbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const handleLogout = async () => {
		try {
			// const res = await axios.post(`${HOST_DOMAIN_BE}/user/logout`, 'POST', {
			// 	refresh_token: refresh_token,
			// });
			// dispatch(setLoginStatus(false));
			// localStorage.removeItem('access_token');
			// navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<header className='flex h-16 items-center gap-4 border-b px-4 md:px-6'>
			<nav className=' flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<h1 className='ml-16 text-xl font-semibold text-white hidden'>
					Explore
				</h1>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
						<Menu className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
			</Sheet>
			<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
				<form className='ml-auto flex-1 sm:flex-initial'>
					<div className='relative hidden'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search problems...'
							className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-black text-white'
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='secondary' size='icon' className='rounded-full'>
							<CircleUser className='h-5 w-5' />
							<span className='sr-only'>Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							{/* <a href='/setting'>Settings</a> */}
						</DropdownMenuItem>
						<DropdownMenuItem>
							<a href='/contact'>Support</a>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{/* <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem> */}
						{isLoggedIn ? (
							<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
						) : (
							''
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
export default Topbar;
