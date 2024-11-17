import { HOST_DOMAIN_BE } from '@/helpers/domain';

const SignInwithGoogle = () => {
	// const navigate = useNavigate();
	const googleLogin = async () => {
		try {
			window.location.href = `${HOST_DOMAIN_BE}/auth/google`;
		} catch (error) {
			console.log('🚀 ~ googleLogin ~ error:', error);
		}
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
