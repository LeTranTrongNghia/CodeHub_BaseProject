import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createBrowserHistory } from 'history';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <ProblemsPage />
	<React.StrictMode>
		<HistoryBrowserRouter history={history}>
			<App />
			<ToastContainer />
		</HistoryBrowserRouter>
	</React.StrictMode>,
);
