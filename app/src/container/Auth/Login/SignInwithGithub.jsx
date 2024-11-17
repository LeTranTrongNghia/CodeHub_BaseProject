import { HOST_DOMAIN_BE } from '@/helpers/domain';
const SignInwithGithub = () => {
	const gihubLogin = async () => {
		try {
			console.log('đổi domain');

			window.location.href = `${HOST_DOMAIN_BE}/auth/github`;
			// await axios.get(`${HOST_DOMAIN_BE}/auth/github`);

			console.log('đổi xong');
		} catch (error) {
			console.log('🚀 ~ gihubLogin ~ error:', error);
		}
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
