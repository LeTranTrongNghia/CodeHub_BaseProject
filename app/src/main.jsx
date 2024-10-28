import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/config.jsx';
import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

// Create router
// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <App />,
// 		children: [
// 			{
// 				path: '/',
// 				element: <IndexHome />,
// 			},
// 			{
// 				path: '/main-home',
// 				element: <MainHome />,
// 			},
// 			{
// 				path: '/problems',
// 				element: <ProblemsPage />,
// 			},
// 			{
// 				path: '/problems/solve/:id',
// 				element: <CodeEditorWrapper />,
// 			},
// 			{
// 				path: '/courses',
// 				element: <CourseList />,
// 			},
// 			{
// 				path: '/courses/:id',
// 				element: <CourseDetails />,
// 			},
// 			{
// 				path: '/playground',
// 				element: <FileUploadAndDisplay />,
// 			},
// 			{
// 				path: '/contact',
// 				element: <ContactPage />,
// 			},
// 			{
// 				path: '/otp',
// 				element: <OTPVerification />,
// 			},
// 			{
// 				path: '/login',
// 				element: <Login />,
// 			},
// 			{
// 				path: '/register',
// 				element: <Register />,
// 			},
// 		],
// 	},
// ]);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{/* <RouterProvider router={router} /> */}
				<HistoryBrowserRouter history={history}>
					<App />
					<ToastContainer />
				</HistoryBrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
