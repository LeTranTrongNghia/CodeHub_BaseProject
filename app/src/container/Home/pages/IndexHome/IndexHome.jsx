import Header from './components/Header.jsx';
import PreviewLanding from './components/PreviewLanding.jsx';
import TopBar from './components/TopBar.jsx';

const IndexHome = () => {
	return (
		<section className='flex min-h-screen w-full flex-col '>
			<TopBar />
			<Header />
			<PreviewLanding />
		</section>
	);
};

export default IndexHome;
