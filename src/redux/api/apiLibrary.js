import axios from 'axios';

/** ----------------------------------------------------------------------
 *   > API endpoints Url generators
 *  ---------------------------------------------------------------------- */
export const allCoinsUrl = () => (
  'https://api.coinstats.app/public/v1/coins?skip=0&currency=USD'
);
export const coinHistoryUrlById = (coinId) => (
  `https://api.coinstats.app/public/v1/charts?period=1w&coinId=${coinId}`
);
export const coinMarketsUrlById = (coinId) => (
  `https://api.coinstats.app/public/v1/markets?coinId=${coinId}`
);

/** ----------------------------------------------------------------------
 *   > get the details for a Coin
 *  ---------------------------------------------------------------------- */
const getCoinDetails = (coinId, thunkAPI) => new Promise((resolve, reject) => {
  const { coins: { assets: availableCoins } } = thunkAPI.getState();
  const [coinFound] = availableCoins.filter((coin) => coin.id === coinId);

  const fetchAllDetails = async (coinFound) => {
    const respHistory = await axios.get(coinHistoryUrlById(coinId));
    const respMarkets = await axios.get(coinMarketsUrlById(coinId));

    const coinFullDetails = {
      ...coinFound,
      history: respHistory.data,
      markets: respMarkets.data,
    };

    return ({ data: { ...coinFullDetails } });
  };

  setTimeout(() => (coinFound
    ? resolve(fetchAllDetails(coinFound))
    : reject(new Error(`The Coin with id: '${coinId}' was not found`))),
  500);
});

export default getCoinDetails;
