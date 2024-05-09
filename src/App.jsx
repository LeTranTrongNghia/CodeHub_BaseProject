import { Route, Routes } from 'react-router-dom';
import { publicRoute } from './routes/routes';
import { Suspense } from 'react';
import ProblemsPage from './container/Home/pages/MainHome/ProblemsPage';

const App = () => {
	return (
		// <ProblemsPage />
		<Suspense>
			<Routes>
				{publicRoute.map((route, idx) => {
					const Page = route.component;
					return <Route key={idx} path={route.path} element={<Page />}></Route>;
				})}
			</Routes>
		</Suspense>
	);
};

export default App;
