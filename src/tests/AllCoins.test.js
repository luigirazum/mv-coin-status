import { screen } from '@testing-library/react';
import { act, create } from 'react-test-renderer';
import renderWithProvider from '../react/utils/renderUtils';
import { mockCoins } from './mocks/mockData';
import AllCoins from '../react/routes/AllCoins';

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
};

let testRender = null;
let store = null;
let container = null;

const resetTestEnv = () => {
  container.remove();
  container = null;
  testRender = null;
  store = null;
};

beforeEach(() => {
  // setup a DOM element as a render target
  testRender = renderWithProvider(
    <AllCoins />,
    { preloadedState: { ...testState } },
    { ...testRouter },
  );
  ({ container, store } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
});

/**
 * START: AllCoins component test
*/
describe('AllCoins component tests', () => {
  /**
   * START: AllCoins render
  */
  describe('Coins must be rendered', () => {
    test('should render bitcoin', () => {
      expect(screen.getByTestId('bitcoin')).toBeInTheDocument();
    });
    test('should render ethereum', () => {
      expect(screen.getByTestId('ethereum')).toBeInTheDocument();
    });
    test('should render tether', () => {
      expect(screen.getByTestId('tether')).toBeInTheDocument();
    });
    test('should render binance-coin', () => {
      expect(screen.getByTestId('binance-coin')).toBeInTheDocument();
    });
    test('should render usd-coin', () => {
      expect(screen.getByTestId('usd-coin')).toBeInTheDocument();
    });
    test('should render 5 coins in total', () => {
      expect(screen.getAllByTestId('coinName')).toHaveLength(5);
    });
  });
  /**
   * END: AllCoins render
  */

  describe('AllCoins component filter test', () => {
    test('no filter should render 5 coins', () => {
      expect(screen.getAllByTestId('coinName')).toHaveLength(5);
    });

    test('with filter -coin- should render 2 coins', () => {
      act(() => {
        store.dispatch({ type: 'coins/filterCoins', payload: 'coin' });
      });
      expect(screen.getAllByTestId('coinName')).toHaveLength(2);
    });

    test('with filter -ether- should render 2 coins', () => {
      act(() => {
        store.dispatch({ type: 'coins/filterCoins', payload: 'ether' });
      });
      expect(screen.getAllByTestId('coinName')).toHaveLength(2);
    });

    test('with filter -allcoins- should render 0 coins', () => {
      act(() => {
        store.dispatch({ type: 'coins/filterCoins', payload: 'allcoins' });
      });
      expect(screen.queryByTestId('coinName')).toBeNull();
    });
  });

  describe('AllCoins component snapshot test', () => {
    test('snapshot renders 5 Coins correctly', () => {
      const { component } = testRender;

      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
/**
 * END: AllCoins component tests
*/
