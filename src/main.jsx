import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import './index.css';
import Login from './container/Auth/Login';
import MyTabs from './components/tabs.jsx';
export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MyTabs/>
		{/* <HistoryBrowserRouter history={history}>
			<App />
		</HistoryBrowserRouter> */}
	</React.StrictMode>,
);
