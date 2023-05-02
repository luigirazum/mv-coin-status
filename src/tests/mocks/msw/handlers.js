import { rest } from 'msw';
import { mockCoins, mockCoinsDetails } from '../mockData';
import {
  allCoinsUrl,
  coinHistoryUrlById,
  coinMarketsUrlById,
} from '../../../redux/api/apiLibrary';

const mockApi = true;

const handlers = [
  // mock request api for fetching all coins
  rest.get(allCoinsUrl(mockApi), (req, res, ctx) => {
    const { searchParams } = req.url;
    const { skip, currency } = Object
      .fromEntries(searchParams.entries());

    if (Number(skip) === 0 && currency === 'USD') {
      // success response
      return res(
        ctx.status(200),
        ctx.json({
          ...mockCoins,
        }),
      );
    }

    // error response
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'not found' },
      }),
    );
  }),

  // mock request api for fetching history data for a coin
  rest.get(coinHistoryUrlById(undefined, mockApi), (req, res, ctx) => {
    const { searchParams } = req.url;
    const { period, coinId } = Object
      .fromEntries(searchParams.entries());

    if (period === '1w' && coinId) {
      // success response
      return res(
        ctx.status(200),
        ctx.json({
          ...mockCoinsDetails[coinId].history,
        }),
      );
    }

    // error response
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: `the coin with id: '${coinId}' was not found` },
      }),
    );
  }),

  // mock request api for fetching markets data for a coin
  rest.get(coinMarketsUrlById(undefined, mockApi), (req, res, ctx) => {
    const { searchParams } = req.url;
    const { coinId } = Object
      .fromEntries(searchParams.entries());

    if (coinId) {
      // success response
      return res(
        ctx.status(200),
        ctx.json([...mockCoinsDetails[coinId].markets]),
      );
    }

    // error response
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: `the coin with id: '${coinId}' was not found` },
      }),
    );
  }),
];

export default handlers;
