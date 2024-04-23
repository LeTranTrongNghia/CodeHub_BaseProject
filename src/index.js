import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GeminiTest from './GeminiTest.js'; // Assuming src is your component directory
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GeminiTest />  {/* Render GeminiTest directly */}
  </React.StrictMode>
);

// Performance measurement (optional)
reportWebVitals();
