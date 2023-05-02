import { create } from 'react-test-renderer';
import renderWithProvider from '../react/utils/renderUtils';
import { mockCoins } from './mocks/mockData';
import CoinsLayout from '../react/routes/CoinsLayout';

const testState = {
  coins: {
    assets: [...mockCoins.coins],
    status: { type: 'idle' },
    filter: { active: false, by: '' },
    error: null,
  },
};

const testRouter = {
  routerWrapper: {
    memory: true,
  },
  routes: ['/coins'],
  path: 'coins',
};

let testRender = null;
let container = null;
let queryByTitle;
let queryByPlaceholderText;

const resetTestEnv = () => {
  container.remove();
  container = null;
  testRender = null;
};

beforeEach(() => {
  // setup a DOM element as a render target
  testRender = renderWithProvider(
    <CoinsLayout />,
    { preloadedState: { ...testState } },
    { ...testRouter },
  );
  ({
    container, queryByTitle, queryByPlaceholderText,
  } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
});

/* START: CoinsLayout component test */
describe('CoinsLayout component tests', () => {
  /* START: CoinsLayout render */
  describe('CoinsLayout must render a NavBar', () => {
    test('should render the Home link', () => {
      expect(queryByTitle('home-icon')).toBeInTheDocument();
    });
    test('should render the Coins link', () => {
      expect(queryByTitle('coins-icon')).toBeInTheDocument();
    });
    test('should render the Filter field', () => {
      expect(queryByPlaceholderText(/filter by/i)).toBeInTheDocument();
    });
  });
  /* END: CoinsLayout render */

  /* START: CoinsLayout snapshot render */
  describe('CoinsLayout component snapshot test', () => {
    test('snapshot renders correctly', () => {
      const { component } = testRender;

      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
/* END: CoinsLayout component tests */
