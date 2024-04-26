import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.jsx'
import './index.css'
import Login from './Login/login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
    <App />
  </React.StrictMode>,
)
