import { screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import renderWithProvider from '../react/utils/renderUtils';
import Home from '../react/routes/Home';

let container = null;
let testRender = null;
let queryByText;
let queryByRole;

const resetTestEnv = () => {
  container.remove();
  container = null;
  testRender = null;
};

beforeEach(() => {
  // setup a DOM element as a render target
  testRender = renderWithProvider(
    <Home />,
    {},
    { routerWrapper: { memory: true } },
  );
  ({ container, queryByText } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
});

/* START: Home page component test */
describe('Home component tests', () => {
  /* START: Home page render */
  describe('Home page must be rendered', () => {
    test('should render a Welcome', () => {
      expect(queryByText('Welcome')).toBeInTheDocument();
    });
    test('should render a Start button', () => {
      expect(queryByText('Start')).toBeInTheDocument();
    });
    test('should render an About button', () => {
      expect(queryByText('About')).toBeInTheDocument();
    });
  });
  /* END: Home page render */

  describe('Home page component snapshot test', () => {
    test('snapshot renders correctly', () => {
      const { component } = testRender;

      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
/* END: Coin component tests */
