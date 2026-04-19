import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Injection Master do React DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
