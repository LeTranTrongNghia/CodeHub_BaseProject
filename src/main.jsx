import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.jsx'
// import './index.css'
import Login from './Login/login.jsx'
import CodeEditorWrapper from './Code_Editor/code_page.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CodeEditorWrapper />
    {/* <Login />
    <App /> */}
  </React.StrictMode>,
)
