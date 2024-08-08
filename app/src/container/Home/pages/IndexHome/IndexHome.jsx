import BentoGrid from './components/BentoGrid.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import InfoLanding from './components/InfoLanding.jsx';
import PreviewLanding from './components/PreviewLanding.jsx';
import TopBar from './components/TopBar.jsx';

const IndexHome = () => {
	return (
		<section className='flex min-h-screen w-full flex-col '>
			<TopBar />
			<Header />
			<PreviewLanding />
			<BentoGrid />
			<InfoLanding />
			<Footer />
		</section>
	);
};

export default IndexHome;
