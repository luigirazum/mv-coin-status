import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rootTarget = document.getElementById('root');
const root = ReactDOM.createRoot(rootTarget);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
