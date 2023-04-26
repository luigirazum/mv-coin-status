import { rest } from 'msw';
import { allCoinsUrl } from '../../../redux/api/apiLibrary';
import { mockCoins } from '../mockData';

console.log(allCoinsUrl({ mockVersion: true }));
const handlers = [
  rest.get(allCoinsUrl(), (req, res, ctx) => {
    const { skip, currency } = req.searchParams;
    console.log('skip', skip);
    console.log('currency', currency);

    // if (skip === 0 && currency === 'USD') {
    return res(
      ctx.status(200),
      ctx.json({
        ...mockCoins,
      }),
    );
    // }

    // return res(
    //   ctx.status(404),
    //   ctx.json({
    //     error: { message: 'not found' },
    //   }),
    // );
  }),
];

export default handlers;
