import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/config.jsx';

// Import components
import App from "./App";
import Record from "./components/MainHome/Record.jsx";
import ProblemsPage from "./container/Home/pages/MainHome/ProblemsPage.jsx";
import CodeEditorWrapper from "./container/Workspace/Code_Editor/code_editor.jsx";
import CourseList from "./components/MainHome/CourseList.jsx";
import CourseDetails from "./components/MainHome/CourseDetails.jsx";
import FileUploadAndDisplay from "./components/MainHome/Playground.jsx";
import IndexHome from "./container/Home/pages/IndexHome/IndexHome.jsx";

// Import styles
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainHome from "./container/Home/pages/MainHome/MainHome.jsx";
import ContactPage from "./container/Home/pages/MainHome/support.jsx";

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
        path: "/main-home",
        element: <MainHome />,
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
      {
        path: "/contact",
        element: <ContactPage />,
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

