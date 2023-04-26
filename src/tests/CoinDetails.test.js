import { waitFor } from '@testing-library/react';
import renderWithProvider from '../react/utils/renderUtils';
import { mockCoins, mockBitcoin } from './mocks/mockData';
import CoinDetails from '../react/routes/CoinDetails';

const getCoinDetails = jest.fn();

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
let queryByTestId;

const resetTestEnv = () => {
  container.remove();
  container = null;
  // testRender = null;
};

beforeEach(async () => {
  // setup a DOM element as a render target
  testRender = await renderWithProvider(
    <CoinDetails />,
    { preloadedState: { ...testState } },
    { ...testRouter },
  );
  ({ container } = testRender);
  ({ queryByTestId } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
});

/** START: CoinDetails component test */
describe('CoinDetails component tests', () => {
  /** START: CoinDetails render at /coins/bitcoin */
  describe('at /coins/bitcoin renders bitcoin currency details', () => {
    test('it\'s id is bitcoin', async () => {
      await getCoinDetails.mockResolvedValue(mockBitcoin);
      waitFor(() => {
        expect(getCoinDetails).toHaveBeenCalledWith('bitcoin');
        // expect(queryByTestId('bitcois')).toBeInTheDocument();
      });
    });
    test('it has a Name', () => {
      waitFor(() => {
        expect(queryByTestId('coinName')).toBeInTheDocument();
      });
    });
    test('it has a Symbol', () => {
      waitFor(() => {
        expect(queryByTestId('coinSymbol')).toBeInTheDocument();
      });
    });
    test('it has a Rank', () => {
      waitFor(() => {
        expect(queryByTestId('coinRank')).toBeInTheDocument();
      });
    });
    test('it has a Price', () => {
      waitFor(() => {
        expect(queryByTestId('coinPrice')).toBeInTheDocument();
      });
    });
    test('it has a Volume', () => {
      waitFor(() => {
        expect(queryByTestId('coinVolume')).toBeInTheDocument();
      });
    });
    test('it has a price per hour', () => {
      waitFor(() => {
        expect(queryByTestId('coinPrice1h')).toBeInTheDocument();
      });
    });
    test('it has a price per day', () => {
      waitFor(() => {
        expect(queryByTestId('coinPrice1d')).toBeInTheDocument();
      });
    });
    test('it has a price per week', () => {
      waitFor(() => {
        expect(queryByTestId('coinPrice1w')).toBeInTheDocument();
      });
    });
    test('it has an image icon', () => {
      waitFor(() => {
        expect(queryByTestId('coinIcon')).toBeInTheDocument();
      });
    });
  });
  /** END: CoinDetails render at /coins/bitcoin */

  /** START: CoinDetails snapshot test */
  describe('CoinDetails component snapshot test', () => {
    test('snapshot renders CoinDetails correctly', () => {
    });
  });
  /** END: CoinDetails snapshot test */
});
/** END: CoinDetails component test */
