import { rest } from 'msw';
import { allCoinsUrl } from '../../../redux/api/apiLibrary';
import { mockCoins } from '../mockData';

console.log(allCoinsUrl({ mockVersion: true }));
const handlers = [
  rest.get(allCoinsUrl({ mockVersion: true }), (req, res, ctx) => {
    const { searchParams } = req.url;
    const { skip, currency } = Object
      .fromEntries(searchParams.entries());

    if (Number(skip) === 0 && currency === 'USD') {
      return res(
        ctx.status(200),
        ctx.json({
          ...mockCoins,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'not found' },
      }),
    );
  }),
];

export default handlers;
