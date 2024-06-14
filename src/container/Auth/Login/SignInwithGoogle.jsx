import { auth, firestore } from '@/firebase/firebase';
import User from '@/model/User';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignInwithGoogle = () => {
	const navigate = useNavigate();
	const googleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(async result => {
				const user = result.user;
				if (result.user) {
					const googleUser = new User(
						user.uid,
						user.email,
						'',
						user.displayName,
						user.photoURL,
					).toPlainObject();
					await setDoc(doc(firestore, 'Users', user.uid), googleUser);
					toast.success('User logged in Successfully', {
						position: 'top-center',
					});
					navigate('/main-home');
				}
			})
			.catch(error => {
				toast.error('Failed to log in. Please try again.');
			});
	};
	return (
		<div onClick={googleLogin}>
			<a
				href='#'
				className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
			>
				<img
					className='h-5 w-5'
					src='https://www.svgrepo.com/show/506498/google.svg'
					alt=''
				/>
			</a>
		</div>
	);
};

export default SignInwithGoogle;
