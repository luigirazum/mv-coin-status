import { screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import renderWithProvider from '../react/utils/renderUtils';
import { mockCoins } from './mocks/mockData';
import Coin from '../react/components/Coin';

const [bitCoin] = mockCoins.coins;
const testState = {
  coins: {
    assets: [mockCoins.coins],
    status: { type: 'idle' },
    filter: { active: false, by: '' },
    error: null,
  },
};

let container = null;
let testRender = null;

const resetTestEnv = () => {
  container.remove();
  container = null;
  testRender = null;
};

beforeEach(() => {
  // setup a DOM element as a render target
  testRender = renderWithProvider(
    <Coin id={bitCoin.id} />,
    { preloadedState: { ...testState } },
  );
  ({ container } = testRender);
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  resetTestEnv();
});

/**
 * START: Coin component test
 */
describe('Coin component tests', () => {
  /**
   * START: Coin render
  */
  describe('Coin must be rendered', () => {
    test('should render a name', () => {
      expect(screen.getByTestId('coinName')).toBeInTheDocument();
    });
    test('should render a rank', () => {
      expect(screen.getByTestId('coinRank')).toBeInTheDocument();
    });
    test('should render a symbol', () => {
      expect(screen.getByTestId('coinSymbol')).toBeInTheDocument();
    });
    test('should render a logo', () => {
      expect(screen.getByTestId('coinLogo')).toBeInTheDocument();
    });
  });
  /**
   * END: Coin render
  */

  describe('Coin component snapshot test', () => {
    test('snapshot renders correctly', () => {
      const { component } = testRender;

      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
/**
 * END: Coin component tests
*/
