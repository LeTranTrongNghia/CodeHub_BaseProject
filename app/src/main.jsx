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
				// <ToastContainer />
// 			</HistoryBrowserRouter>
// 		</PersistGate>
// 	</Provider>,
// );

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/config.jsx';

// Import components
import App from "./App";
import Record from "./components/Record";
import ProblemDes from "./components/Code_Editor/ProblemDes.jsx";
import ProblemForm from "./components/ProblemForm.jsx";
import ProblemsPage from "./container/Home/pages/MainHome/ProblemsPage.jsx";
import CodeEditorWrapper from "./container/Workspace/Code_Editor/code_editor.jsx";
import CourseList from "./components/CourseList.jsx";
import CourseDetails from "./components/CourseDetails.jsx";
import FileUploadAndDisplay from "./components/Playground.jsx";
import IndexHome from "./container/Home/pages/IndexHome/IndexHome.jsx";

// Import styles
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <IndexHome />,
      },
      {
        path: "/records/edit/:id",
        element: <Record />,
      },
      {
        path: "/records/create",
        element: <Record />,
      },
      {
        path: "/problems",
        element: <ProblemsPage />,
      },
      {
        path: "/problems/solve/:id",
        element: <CodeEditorWrapper />,
      },
      {
        path: "/problems/create",
        element: <ProblemForm />,
      },
      {
        path: "/courses",
        element: <CourseList />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/playground",
        element: <FileUploadAndDisplay />,
      },
    ],
  },
]);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

