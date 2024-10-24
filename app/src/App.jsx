import { Route, Routes } from 'react-router-dom';
import { adminRoute, protectedRoute, publicRoute } from './routes/routes';
import { Suspense } from 'react';
import IndexHome from './container/Home/pages/IndexHome';
import AdminRoute from './routes/AdminRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Loading from './components/Loading';

const App = () => {
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
				<Route element={<ProtectedRoute />}>
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

// import { Outlet } from 'react-router-dom';

// const App = () => {
// 	return (
// 		// <div className="w-full p-6">
// 		//   <Navbar />
// 		//   <Outlet />
// 		// </div>
// 		<Outlet />
// 	);
// };

// export default App;
