import { auth } from '@/firebase/firebase';
import User from '@/model/User';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignInwithFacebook = () => {
	const navigate = useNavigate();
	const facebookLogin = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider)
			.then(async result => {
				const user = result.user;
				if (result.user) {
					const facebookUser = new User(
						user.uid,
						user.email,
						'',
						user.displayName,
						user.photoURL,
					).toPlainObject();
					// await setDoc(doc(firestore, 'Users', user.uid), facebookUser);
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
		<div onClick={facebookLogin}>
			<a
				href='#'
				className='w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
			>
				<img
					className='h-5 w-5'
					src='https://www.svgrepo.com/show/512120/facebook-176.svg'
					alt=''
				/>
			</a>
		</div>
	);
};

export default SignInwithFacebook;
