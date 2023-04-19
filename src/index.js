import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import setupStore from './redux/store';
import App from './components/App';

const rootTarget = document.getElementById('root');
const root = ReactDOM.createRoot(rootTarget);

root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
);
