import { create } from 'react-test-renderer';
import renderWithProvider from '../react/utils/renderUtils';
import { mockCoins, mockBitcoin } from './mocks/mockData';
import NavBar from '../react/components/NavBar';

const testState = {
  coins: {
    assets: [...mockCoins.coins],
    status: { type: 'idle' },
    filter: { active: false, by: '' },
    error: null,
  },
};

const testDetailsBitcoin = {
  details: {
    asset: mockBitcoin,
    status: { type: 'idle' },
    error: null,
  },
};

const testRouter = {
  routerWrapper: {
    memory: true,
  },
  routes: ['/coins'],
  path: '/coins',
};

let testRender = null;
let container = null;
let queryByText;
let queryByPlaceholderText;
let queryByTitle;

const resetTestEnv = () => {
  container.remove();
  container = null;
  testRender = null;
};

beforeEach(() => {
  // setup a DOM element as a render target
  testRender = renderWithProvider(
    <NavBar />,
    { preloadedState: { ...testState } },
    { ...testRouter },
  );
  ({ container } = testRender);
  ({ queryByText, queryByPlaceholderText } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
});

/** START: NavBar component test */
describe('NavBar component tests', () => {
  /** START: NavBar render at /coins */
  describe('at /coins renders a NavBar with Home and Coins links', () => {
    test('it has a Home link', () => {
      expect(queryByText('Home')).toBeInTheDocument();
    });
    test('it has a Coins link', () => {
      expect(queryByText('Coins')).toBeInTheDocument();
    });
    test('it has a Filter field', () => {
      expect(queryByPlaceholderText(/filter by/i)).toBeInTheDocument();
    });
  });
  /** END: NavBar render at /coins */

  /** START: NavBar render at /coins/:coinId */
  describe('at /coins/:id renders a NavBar with < and coinName links', () => {
    beforeEach(() => {
      resetTestEnv();

      const testDetailsState = {
        ...testState,
        ...testDetailsBitcoin,
      };
      // setup a DOM element as a render target
      testRender = renderWithProvider(
        <NavBar />,
        { preloadedState: { ...testDetailsState } },
        {
          ...testRouter,
          routerWrapper: { memory: true },
          routes: ['/coins/bitcoin'],
          path: '/coins/:id',
        },
      );
      ({ container } = testRender);
      ({ queryByText, queryByPlaceholderText, queryByTitle } = testRender);
      document.body.appendChild(container);
    });

    test('it has a Home link', () => {
      expect(queryByTitle('back-icon')).toBeInTheDocument();
    });
    test('it has a Bitcoin link', () => {
      expect(queryByText(/Bitcoin/i)).toBeInTheDocument();
    });
    test('it does\'t have a Filter field', () => {
      expect(queryByPlaceholderText(/filter by/i)).toBeNull();
    });
  });
  /** END: NavBar render at /coins/coinId */

  /** START: NavBar snapshot test */
  describe('NavBar component snapshot test', () => {
    test('snapshot renders NavBar correctly', () => {
      const { component } = testRender;

      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  /** END: NavBar snapshot test */
});
/** END: NavBar component test */
