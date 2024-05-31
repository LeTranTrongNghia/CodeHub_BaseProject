import { Route, Routes } from 'react-router-dom';
import { adminRoute, publicRoute } from './routes/routes';
import { Suspense } from 'react';
import IndexHome from './container/Home/pages/IndexHome';
import AdminRoute from './routes/AdminRoute';

const App = () => {
	return (
		<Suspense>
			<Routes>
				<Route index path='/' element={<IndexHome />} />
				<Route>
					{publicRoute.map((route, idx) => {
						const Page = route.component;
						return (
							<Route key={idx} path={route.path} element={<Page />}></Route>
						);
					})}
				</Route>
				<Route element={<AdminRoute />}>
					{adminRoute.map((route, idx) => {
						const Page = route.component;
						return (
							<Route key={idx} path={route.path} element={<Page />}></Route>
						);
					})}
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
