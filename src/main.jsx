import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createBrowserHistory } from 'history';
import './index.css';
import ProblemsPage from './container/Home/pages/MainHome/ProblemsPage.jsx';
import CoursesPage from './container/Home/pages/MainHome/CoursesPage.jsx';
import LecturesPage from './container/Home/pages/MainHome/LecturesPage.jsx';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <ProblemsPage />
	<React.StrictMode>
		<HistoryBrowserRouter history={history}>
			<App />
		</HistoryBrowserRouter>
	</React.StrictMode>,
);
