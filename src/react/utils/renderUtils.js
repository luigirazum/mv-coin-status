import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter, MemoryRouter, Routes, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import your setupStore as a basic setup
import setupStore from '../../redux/store';

/** ------------------------------------------------------------
 *   > to test components that require a store/state/router
 *  ------------------------------------------------------------ */
const renderWithProvider = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
  {
    routerWrapper = null,
    routes = ['/'],
    path = '/',
    user = userEvent,
  } = {},
) => {
  const RouterWrapper = ({ children }) => {
    if (routerWrapper.memory) {
      return (
        <MemoryRouter initialEntries={routes}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </MemoryRouter>
      );
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route path={path} element={children} />
        </Routes>
      </BrowserRouter>
    );
  };

  RouterWrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      {
      routerWrapper
        ? <RouterWrapper>{children}</RouterWrapper>
        : children
      }
    </Provider>
  );

  Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const component = Wrapper({ children: ui });
  if (routerWrapper && routerWrapper.browser) window.history.pushState({}, 'test page', routes[0]);

  // Return an object with the store and all of RTL's query functions
  return ({
    store,
    component,
    user,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  });
};

export default renderWithProvider;
