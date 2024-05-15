import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createBrowserHistory } from 'history';
import './index.css';
import IndexHome from './container/Home/pages/IndexHome/IndexHome.jsx';
import LecturesPage from './container/Home/pages/MainHome/LecturesPage.jsx';
import Abc from './container/Workspace/Code_Editor/Abc.jsx';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <Abc />
	<React.StrictMode>
		<HistoryBrowserRouter history={history}>
			<App />
		</HistoryBrowserRouter>
	</React.StrictMode>,
);
