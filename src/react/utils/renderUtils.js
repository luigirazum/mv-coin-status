import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
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
    browserRouter = false,
    ...renderOptions
  } = {},
) => {
  if (browserRouter) {
    console.log('yes');
  }
  const Wrapper = ({ children }) => (
    !browserRouter
      ? (<Provider store={store}>{children}</Provider>)
      : (
        <Provider store={store}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </Provider>
      )
  );

  Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const component = Wrapper({ children: ui });
  // Return an object with the store and all of RTL's query functions
  return ({
    store,
    component,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  });
};

/** --------------------------------------------------------------
 *   > to test components that require a <Router>
 *  -------------------------------------------------------------- */
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export { renderWithProviders, renderWithRouter };
