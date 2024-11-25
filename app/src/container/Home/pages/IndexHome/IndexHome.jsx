import { ReactLenis } from '@studio-freight/react-lenis';
import BentoGrid from './components/BentoGrid.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import InfoLanding from './components/InfoLanding.jsx';
import PreviewLanding from './components/PreviewLanding.jsx';
import TopBar from './components/TopBar.jsx';
import Particles from '@/components/ui/particles';
import { useEffect, useState } from "react";

const IndexHome = () => {
	const [color, setColor] = useState("#000000");

	useEffect(() => {
		setColor("#000000");
	}, []);

	return (
		<ReactLenis
			root
			easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
		>
			<TopBar />
			<section className='flex min-h-screen w-full flex-col relative'>
				<Particles
					className="absolute inset-0"
					quantity={100}
					ease={80}
					color={color}
					refresh
				/>
				<Header />
				<PreviewLanding />
				<BentoGrid />
				<InfoLanding />
				<Footer />
			</section>
		</ReactLenis>
	);
};

export default IndexHome;
