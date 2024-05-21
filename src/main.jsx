import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createBrowserHistory } from 'history';
import './index.css';
import IndexHome from './container/Home/pages/IndexHome/IndexHome.jsx';
import CoursesPage from './container/Home/pages/MainHome/CoursesPage.jsx';
import Abc from './container/Workspace/Code_Editor/Abc.jsx';
import Admin from './container/Admin/Admin.jsx';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	<Admin />,
	// <React.StrictMode>
	// 	<HistoryBrowserRouter history={history}>
	// 		<App />
	// 	</HistoryBrowserRouter>
	// </React.StrictMode>,
);
