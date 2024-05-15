import Header from './components/Header.jsx';
import PreviewLanding from './components/PreviewLanding.jsx';
import TopBar from './components/TopBar.jsx';

const IndexHome = () => {
	return <section class="flex min-h-screen w-full flex-col bg-black">
		<TopBar />
		<Header />
		<PreviewLanding />
	</section>;
};

export default IndexHome;