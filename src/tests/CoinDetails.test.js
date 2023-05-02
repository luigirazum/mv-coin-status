import { create } from 'react-test-renderer';
import server from './mocks/msw/server';
import renderWithProvider from '../react/utils/renderUtils';
import { mockCoins, mockBitcoin } from './mocks/mockData';
import CoinDetails from '../react/routes/CoinDetails';

const testDetailsBitcoin = {
  details: {
    asset: mockBitcoin,
    status: { type: 'idle' },
    error: null,
  },
};

const testState = {
  coins: {
    assets: [...mockCoins.coins],
    status: { type: 'idle' },
    filter: { active: false, by: '' },
    error: null,
  },
  ...testDetailsBitcoin,
};

const testRouter = {
  routerWrapper: {
    memory: true,
  },
  routes: ['/coins/bitcoin'],
  path: '/coins/:id',
};

let testRender = null;
let container = null;
let component = null;
let getByTestId;

const resetTestEnv = () => {
  container.remove();
  container = null;
  component = null;
};

beforeAll(() => {
  // start API mocking before all tests
  server.listen();
});

beforeEach(() => {
  // setup a DOM element as a render target
  testRender = renderWithProvider(
    <CoinDetails />,
    { preloadedState: { ...testState } },
    { ...testRouter },
  );
  ({
    container, component, getByTestId,
  } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
  // reset request handlers at mocked API
  server.resetHandlers();
});

afterAll(() => {
  // closes the mocked API server
  server.close();
});

/** START: CoinDetails component test */
describe('CoinDetails component tests', () => {
  /** START: CoinDetails render at /coins/bitcoin */
  describe('at /coins/bitcoin renders bitcoin currency details', () => {
    test('it\'s id is bitcoin', () => {
      expect(getByTestId('bitcoin')).toBeInTheDocument();
    });
    test('it has a Name', () => {
      expect(getByTestId('coinName')).toBeInTheDocument();
    });
    test('it has a Symbol', () => {
      expect(getByTestId('coinSymbol')).toBeInTheDocument();
    });
    test('it has a Rank', () => {
      expect(getByTestId('coinRank')).toBeInTheDocument();
    });
    test('it has a Price', () => {
      expect(getByTestId('coinPrice')).toBeInTheDocument();
    });
    test('it has a Volume', () => {
      expect(getByTestId('coinVolume')).toBeInTheDocument();
    });
    test('it has a price per hour', () => {
      expect(getByTestId('coinPrice1h')).toBeInTheDocument();
    });
    test('it has a price per day', () => {
      expect(getByTestId('coinPrice1d')).toBeInTheDocument();
    });
    test('it has a price per week', () => {
      expect(getByTestId('coinPrice1w')).toBeInTheDocument();
    });
    test('it has an image icon', () => {
      expect(getByTestId('coinIcon')).toBeInTheDocument();
    });
  });
  /** END: CoinDetails render at /coins/bitcoin */

  /** START: CoinDetails snapshot test */
  describe('CoinDetails component snapshot test', () => {
    test('snapshot renders CoinDetails correctly', () => {
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  /** END: CoinDetails snapshot test */
});
/** END: CoinDetails component test */
