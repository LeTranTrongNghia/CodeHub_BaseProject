import { Route, Routes } from 'react-router-dom';
import { publicRoute } from './routes/routes';
import { Suspense } from 'react';

const App = () => {
	return (
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
