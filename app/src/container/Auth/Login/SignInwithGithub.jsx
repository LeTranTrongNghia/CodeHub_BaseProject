import { auth, firestore } from '@/firebase/firebase';
import User from '@/model/User';
import { setLoginStatus } from '@/redux/userReducer/userReducer';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignInwithGithub = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const gihubLogin = () => {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider)
			.then(async result => {
				const user = result.user;
				if (result.user) {
					const githubUser = new User(
						user.uid,
						user.email,
						'',
						user.displayName,
						user.photoURL,
					).toPlainObject();
					await setDoc(doc(firestore, 'Users', user.uid), githubUser);
					toast.success('User logged in Successfully', {
						position: 'top-center',
					});
					navigate('/main-home');
				}
				dispatch(setLoginStatus(true));
			})
			.catch(error => {
				console.log('🚀 ~ gihubLogin ~ error:', error);
				toast.error('Failed to log in. Please try again.');
			});
	};
	return (
		<div onClick={gihubLogin}>
			<a
				href='#'
				className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
			>
				<img
					className='h-5 w-5'
					src='https://www.svgrepo.com/show/512317/github-142.svg'
					alt=''
				/>
			</a>
		</div>
	);
};

export default SignInwithGithub;
