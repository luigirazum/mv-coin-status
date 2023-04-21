import axios from 'axios';

const getCoinDetails = (coinId, thunkAPI) => new Promise((resolve, reject) => {
  const { coins: { assets: availableCoins } } = thunkAPI.getState();
  const [coinFound] = availableCoins.filter((coin) => coin.id === coinId);

  const fetchAllDetails = async (coinFound) => {
    const historyUrl = `https://api.coinstats.app/public/v1/charts?period=1w&coinId=${coinId}`;
    const respHistory = await axios.get(historyUrl);
    const marketsUrl = `https://api.coinstats.app/public/v1/markets?coinId=${coinId}`;
    const respMarkets = await axios.get(marketsUrl);

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
