import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createBrowserHistory } from 'history';
import './index.css';
import IndexHome from './container/Home/pages/IndexHome/IndexHome.jsx';
import CoursesPage from './container/Home/pages/MainHome/CoursesPage.jsx';
import Admin from './container/Admin/Admin.jsx';
import { store, persistor } from './redux/config.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <Admin />
	<Provider store={store}>
		<PersistGate persistor={persistor} loading={null}>
			<HistoryBrowserRouter history={history}>
				<App />
			</HistoryBrowserRouter>
		</PersistGate>
	</Provider>,
);
