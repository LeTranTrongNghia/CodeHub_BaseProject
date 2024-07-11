// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { unstable_HistoryRouter as HistoryBrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import { createBrowserHistory } from 'history';
// import './index.css';
// import { persistor, store } from './redux/config.jsx';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const history = createBrowserHistory();

// ReactDOM.createRoot(document.getElementById('root')).render(
// 	<Provider store={store}>
// 		<PersistGate persistor={persistor} loading={null}>
// 			<HistoryBrowserRouter history={history}>
// 				<App />
// 				<ToastContainer />
// 			</HistoryBrowserRouter>
// 		</PersistGate>
// 	</Provider>,
// );

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Problem from "./components/Problem";
import ProblemList from "./components/ProblemList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
      {
        path: "/records/edit/:id",  // Adjusted path for editing records
        element: <Record />,
      },
      {
        path: "/records/create",   // Adjusted path for creating records
        element: <Record />,
      },
      {
        path: "/problems",         // Path for problems list
        element: <ProblemList />,
      },
      {
        path: "/problems/edit/:id",  // Path for editing problems
        element: <Problem />,
      },
      {
        path: "/problems/create",   // Path for creating problems
        element: <Problem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
