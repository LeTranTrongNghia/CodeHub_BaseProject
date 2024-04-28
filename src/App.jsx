import { Route, Routes } from 'react-router-dom';
import { publicRoute } from './routes/routes';

const App = () => {
	return (
		<Routes>
			{publicRoute.map((route, idx) => {
				const Page = route.component;
				return <Route key={idx} path={route.path} element={<Page />}></Route>;
			})}
		</Routes>
	);
};

export default App;
