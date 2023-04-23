import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// import your setupStore as a basic setup
import setupStore from '../../redux/store';

/** ------------------------------------------------------------
 *   > to test components that require a store/state
 *  ------------------------------------------------------------ */
const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (<Provider store={store}>{children}</Provider>);

  Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  // Return an object with the store and all of RTL's query functions
  return ({ store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) });
};

/** --------------------------------------------------------------
 *   > to test components that require a <Router>
 *  -------------------------------------------------------------- */
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export { renderWithProviders, renderWithRouter };
