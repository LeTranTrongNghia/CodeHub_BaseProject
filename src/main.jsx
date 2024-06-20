import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createBrowserHistory } from 'history';
import './index.css';
import { persistor, store } from './redux/config.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate persistor={persistor} loading={null}>
			<HistoryBrowserRouter history={history}>
				<App />
				<ToastContainer />
			</HistoryBrowserRouter>
		</PersistGate>
	</Provider>,
);
