import { Route, Routes } from 'react-router-dom';
import { adminRoute, protectedRoute, publicRoute } from './routes/routes';
import { Suspense, useEffect, useState } from 'react';
import IndexHome from './container/Home/pages/IndexHome';
import AdminRoute from './routes/AdminRoute';
import { auth } from './firebase/firebase';
import ProtectedRoute from './routes/ProtectedRoute';
import Loading from './components/Loading';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setIsLoggedIn(!!user);
		});

		return () => unsubscribe();
	}, []);
	return (
		<Suspense fallback={<Loading />}>
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
				<Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
					{protectedRoute.map((route, idx) => {
						const Page = route.component;
						return (
							<Route key={idx} path={route.path} element={<Page />}></Route>
						);
					})}
					<Route element={<AdminRoute />}>
						{adminRoute.map((route, idx) => {
							const Page = route.component;
							return (
								<Route key={idx} path={route.path} element={<Page />}></Route>
							);
						})}
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
