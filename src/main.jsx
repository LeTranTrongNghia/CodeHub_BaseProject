import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import Login from './container/Auth/Login';
import CodeEditorWrapper from './Code_Editor/code_page.jsx';
export const history = createBrowserHistory();
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* <CodeEditorWrapper /> */}
		<HistoryBrowserRouter history={history}>
			<App />
		</HistoryBrowserRouter>
	</React.StrictMode>,
);
