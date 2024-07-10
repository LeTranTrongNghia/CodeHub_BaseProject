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
import "./index.css";
import ProblemList from "./components/ProblemList";
import Problem from "./components/Problem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/problem",
    element: <App />,
    children: [
      {
        path: "/problem",
        element: <ProblemList />,
      },
    ],
  },
  {
    path: "/problem/edit/:id",
    element: <App />,
    children: [
      {
        path: "/problem/edit/:id",
        element: <Problem />,
      },
    ],
  },
  {
    path: "/create/problem",
    element: <App />,
    children: [
      {
        path: "/create/problem",
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