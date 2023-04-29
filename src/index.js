import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import setupStore from './redux/store';
import App from './react/App';
import worker from './tests/mocks/msw/browser';
import { fetchCoins } from './redux/coins/coinsActions';

if (process.env.REACT_APP_API === 'intercept') {
  worker.start({
    quiet: true,
    onUnhandledRequest: 'bypass',
  });
} else {
  worker.stop();
}

const rootTarget = document.getElementById('root');
const root = ReactDOM.createRoot(rootTarget);
const appStore = setupStore();

appStore.dispatch(fetchCoins());

root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
