import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom/client';
import ProblemsPage from './container/Home/pages/MainHome/ProblemsPage.jsx';
import './index.css';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <MainHome/>
	<ProblemsPage/>
	// // <AddProblemForm />,
	// <React.StrictMode>
	// 	<HistoryBrowserRouter history={history}>
	// 		<App />
	// 	</HistoryBrowserRouter>
	// </React.StrictMode>,
);
