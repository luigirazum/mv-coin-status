import { act, create } from 'react-test-renderer';
import { fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import server from './mocks/msw/server';
import renderWithProvider from '../react/utils/renderUtils';
import App from '../react/App';
import { mockCoins } from './mocks/mockData';

const initialTestCoins = {
  assets: [...mockCoins.coins],
  status: { type: 'idle' },
  filter: { active: false, by: '' },
  error: null,
};

const initialTestDetails = {
  asset: null,
  status: { type: 'idle' },
  error: null,
};

const initialTestState = {
  coins: { ...initialTestCoins },
  details: { ...initialTestDetails },
};

let testRender = null;
let container = null;
let component = null;
let userEvent = null;
let screen = null;

const resetTestEnv = () => {
  container.remove();
  container = null;
  component = null;
};

beforeAll(() => {
  // start API mocking before all tests
  server.listen();
});

afterEach(() => {
  // reset request handlers at mocked API
  server.resetHandlers();
});

afterAll(() => {
  // closes the mocked API server
  server.close();
  //  cleanup on exiting
  resetTestEnv();
});

/* START: FULL App unit test */
describe('FULL App unit test', () => {
  describe('when the app loads, shows the homepage', () => {
    test('a welcome message is displayed', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      expect(screen.getByText('Welcome')).toBeInTheDocument();
    });

    test('a start button is displayed', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      expect(screen.getByText('Start')).toBeInTheDocument();
    });

    test('an about button is displayed', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      expect(screen.getByText('About')).toBeInTheDocument();
    });

    test('successful snapshot test', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      expect(screen.getByText('About')).toBeInTheDocument();
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('at homepage, when click on start button', () => {
    test('takes you to /coins path', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        userEvent.click(screen.getByText('Start'));
      });
      waitFor(() => {
        screen.findAllByText('Rank');
      });
      expect(screen.getAllByText('Rank')).toHaveLength(5);
    });

    test('renders the available coins', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      waitFor(() => {
        screen.findAllByText('Symbol');
      });

      expect(screen.getAllByText('Symbol')).toHaveLength(5);
      expect(screen.getByTestId('bitcoin')).toHaveClass('coinItem');
      expect(screen.getByTestId('ethereum')).toHaveClass('coinItem');
      expect(screen.getByTestId('tether')).toHaveClass('coinItem');
      expect(screen.getByTestId('binance-coin')).toHaveClass('coinItem');
      expect(screen.getByTestId('usd-coin')).toHaveClass('coinItem');
    });

    test('a navbar is displayed', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Coins')).toBeInTheDocument();
    });

    test('a filter field with a cancel button is displayed', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      expect(screen.getByPlaceholderText(/filter by/i)).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveClass('ctrl-btn');
    });

    test('successful snapshot test', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      waitFor(() => {
        screen.findAllByText('Rank');
      });

      expect(screen.getAllByText('Rank')).toHaveLength(5);
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('at coins page, when a coin from the list is clicked', () => {
    test('a Loading message appears for a moment', async () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      await act(async () => {
        userEvent.click(await screen.getByRole('link', { name: 'Bitcoin Bitcoin Rank 1 Symbol BTC' }));
      });
      waitFor(() => {
        screen.findByText('Loading...');
      });
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('then, it shows the details for that coin', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      expect(screen.getByRole('heading', { name: 'Bitcoin' })).toBeInTheDocument();
      expect(screen.getByTestId('bitcoin')).toBeInTheDocument();
      expect(screen.getByTestId('coinName')).toBeInTheDocument();
      expect(screen.getByTestId('coinSymbol')).toBeInTheDocument();
      expect(screen.getByTestId('coinRank')).toBeInTheDocument();
      expect(screen.getByTestId('coinPrice')).toBeInTheDocument();
      expect(screen.getByTestId('coinVolume')).toBeInTheDocument();
      expect(screen.getByText('Price Change')).toBeInTheDocument();
      expect(screen.getByTestId('coinPrice1h')).toBeInTheDocument();
      expect(screen.getByTestId('coinPrice1d')).toBeInTheDocument();
      expect(screen.getByTestId('coinPrice1w')).toBeInTheDocument();
      expect(screen.getByTestId('coinIcon')).toBeInTheDocument();
    });

    test('successful snapshot test', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      expect(screen.getByRole('heading', { name: 'Bitcoin' })).toBeInTheDocument();
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('at details page, the navbar shows', () => {
    test('the go back (<) button', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      expect(screen.getByRole('link', { name: '<' })).toBeInTheDocument();
    });

    test('the coin name that is showing the details page', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      expect(screen.getByRole('link', { name: 'Bitcoin' })).toBeInTheDocument();
    });

    test('the filter field is not present at details page', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    test('successful snapshot test', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('at details page, when the back (<) button is clicked', () => {
    test('it shows the previous listed coins', async () => {
      await act(async () => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      await waitFor(() => {
        screen.getByText('Price Change');
      });

      act(() => {
        userEvent.click(screen.getByRole('link', { name: '<' }));
      });

      waitFor(() => {
        screen.getByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(5);
      expect(screen.getAllByText('Rank')).toHaveLength(5);
    });

    test('successful snapshot test', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      waitFor(() => {
        screen.getByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(5);
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('back in the coins page, you can filter the results', () => {
    test('by name or symbol', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'eth' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(2);
      expect(screen.queryByTestId('ethereum')).toBeInTheDocument();
      expect(screen.queryByTestId('tether')).toBeInTheDocument();
      expect(screen.queryByTestId('bitcoin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('binance-coin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('usd-coin')).not.toBeInTheDocument();

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'coin' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(2);
      expect(screen.queryByTestId('ethereum')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tether')).not.toBeInTheDocument();
      expect(screen.queryByTestId('bitcoin')).toBeInTheDocument();
      expect(screen.queryByTestId('binance-coin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('usd-coin')).toBeInTheDocument();

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'bnb' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(1);
      expect(screen.queryByTestId('ethereum')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tether')).not.toBeInTheDocument();
      expect(screen.queryByTestId('bitcoin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('binance-coin')).toBeInTheDocument();
      expect(screen.queryByTestId('usd-coin')).not.toBeInTheDocument();
    });

    test('successful snapshot test', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'eth' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(2);
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('at coins page, if the results have a filter', () => {
    test('deleting what is in the filter field will render all the coins back', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'eth' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(2);

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(5);
      expect(screen.queryByTestId('ethereum')).toBeInTheDocument();
      expect(screen.queryByTestId('tether')).toBeInTheDocument();
      expect(screen.queryByTestId('bitcoin')).toBeInTheDocument();
      expect(screen.queryByTestId('binance-coin')).toBeInTheDocument();
      expect(screen.queryByTestId('usd-coin')).toBeInTheDocument();
    });

    test('clicking on the X button will render all the coins back', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'coin' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(2);

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'X' }));
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(5);
      expect(screen.getByTestId('ethereum')).toBeInTheDocument();
      expect(screen.getByTestId('tether')).toBeInTheDocument();
      expect(screen.getByTestId('bitcoin')).toBeInTheDocument();
      expect(screen.getByTestId('binance-coin')).toBeInTheDocument();
      expect(screen.getByTestId('usd-coin')).toBeInTheDocument();
    });

    test('clicking on the coins link will render all the coins back', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'bnb' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(1);

      act(() => {
        fireEvent.click(screen.getByRole('link', { name: 'Coins' }));
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(5);
      expect(screen.getByTestId('ethereum')).toBeInTheDocument();
      expect(screen.getByTestId('tether')).toBeInTheDocument();
      expect(screen.getByTestId('bitcoin')).toBeInTheDocument();
      expect(screen.getByTestId('binance-coin')).toBeInTheDocument();
      expect(screen.getByTestId('usd-coin')).toBeInTheDocument();
    });

    test('successful snapshot test', () => {
      act(() => {
        testRender = renderWithProvider(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          { preloadedState: { ...initialTestState } },
        );
        ({
          container, userEvent, screen, component,
        } = testRender);
        document.body.appendChild(container);
      });

      act(() => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'coin' } });
      });

      waitFor(() => {
        screen.getAllByRole('article');
      });

      expect(screen.getAllByRole('article')).toHaveLength(2);

      act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'X' }));
      });

      expect(screen.getAllByRole('article')).toHaveLength(5);
      const tree = create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
/* END: FULL App unit test */
