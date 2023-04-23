import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import { renderWithProviders } from '../react/utils/renderUtils';
import { mockCoins } from './mocks/mockData';
import AllCoins from '../react/routes/AllCoins';

let testRenderWithProviders = null;
let store = null;
let container = null;
/**
 * START: AllCoins component test
*/
describe('AllCoins component tests', () => {
  /**
   * START: AllCoins render
  */
  describe('Coins must be rendered', () => {
    beforeEach(() => {
      // setup a DOM element as a render target
      testRenderWithProviders = renderWithProviders(
        <MemoryRouter initialEntries={['/coins']}>
          <AllCoins />
        </MemoryRouter>,
        {
          preloadedState: {
            coins: {
              assets: [...mockCoins.coins],
              status: { type: 'idle' },
              filter: { active: false, by: '' },
              error: null,
            },
          },
        },
      );
      ({ container } = testRenderWithProviders);
      document.body.appendChild(container);
    });

    afterEach(() => {
      //  cleanup on exiting
      // unmountComponentAtNode(container);
      container.remove();
      container = null;
      testRenderWithProviders = null;
    });

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
    beforeEach(() => {
      testRenderWithProviders = renderWithProviders(
        <MemoryRouter initialEntries={['/coins']}>
          <AllCoins />
        </MemoryRouter>,
        {
          preloadedState: {
            coins: {
              assets: [...mockCoins.coins],
              status: { type: 'idle' },
              filter: { active: false, by: '' },
              error: null,
            },
          },
        },
      );
      ({ container, store } = testRenderWithProviders);
    });

    afterEach(() => {
      container.remove();
      container = null;
      store = null;
      testRenderWithProviders = null;
    });

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
      container = renderWithProviders(
        <MemoryRouter initialEntries={['/coins']}>
          <AllCoins />
        </MemoryRouter>,
        {
          preloadedState: {
            coins: {
              assets: [...mockCoins.coins],
              status: { type: 'idle' },
              filter: { active: false, by: '' },
              error: null,
            },
          },
        },
      ).container;

      expect(container).toMatchSnapshot();
    });
  });
});
/**
 * END: AllCoins component tests
*/
