import { screen } from '@testing-library/react';
import renderer, { format as prettyFormat } from 'react-test-renderer';
import { renderWithProviders } from '../react/utils/renderUtils';
import { mockCoins } from './mocks/mockData';
import Coin from '../react/components/Coin';

let container = null;
const [bitCoin] = mockCoins.coins;

beforeEach(() => {
  // setup a DOM element as a render target
  container = renderWithProviders(<Coin id={bitCoin.id} />, {
    preloadedState: {
      coins: {
        assets: [mockCoins.coins],
        status: { type: 'idle' },
        filter: { active: false, by: '' },
        error: null,
      },
    },
  }).container;
  document.body.appendChild(container);
});

afterEach(() => {
  //  cleanup on exiting
  // unmountComponentAtNode(container);
  container.remove();
  container = null;
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
      const renderedWithProviders = renderWithProviders(<Coin id={bitCoin.id} />, {
        preloadedState: {
          coins: {
            assets: [mockCoins.coins],
            status: { type: 'idle' },
            filter: { active: false, by: '' },
            error: null,
          },
        },
      });

      container = renderedWithProviders.container;
      const { component } = renderedWithProviders;

      const tree = renderer.create(component);
      const jsonTree = tree.toJSON();
      expect(jsonTree).toMatchSnapshot();
    });
  });
});
/**
 * END: Coin component tests
*/
