import axios from 'axios';

/** ----------------------------------------------------------------------
 *   > API endpoints Url generators
 *  ---------------------------------------------------------------------- */
export const coinSvgIconUrlByIdSymbol = (id, symbol, mockedAPI = null) => {
  const baseCoinIconSvgUrlByIdSymbol = 'https://cryptologos.cc';
  const endPoint = 'logos';
  const parseId = id.trim().toLowerCase();
  const parseSymbol = symbol.trim().toLowerCase();
  const coinSvgIcon = `${parseId}-${parseSymbol}-logo.svg?v=025`;

  return ((process.env.REACT_APP_API === 'intercept') && mockedAPI)
    ? `${baseCoinIconSvgUrlByIdSymbol}/${endPoint}`
    : `${baseCoinIconSvgUrlByIdSymbol}/${endPoint}/${coinSvgIcon}`;
};

export const coinSvgIconMonoUrlBySymbol = (symbol, mockedAPI = null) => {
  const baseCryptoFontMonoUrl = 'https://raw.githubusercontent.com/Cryptofonts/cryptofont';
  const endPoint = '6bb9ed3466ec5a25ac173edd0353a2b5f60a985d/SVG';
  const svgMonoIcon = `${symbol.trim().toLowerCase()}.svg`;

  return ((process.env.REACT_APP_API === 'intercept') && mockedAPI)
    ? `${baseCryptoFontMonoUrl}/${endPoint}`
    : `${baseCryptoFontMonoUrl}/${endPoint}/${svgMonoIcon}`;
};

export const allCoinsUrl = (mockedAPI = null) => {
  const baseAllCoinsUrl = 'https://api.coinstats.app/public/v1/coins';

  return ((process.env.REACT_APP_API === 'intercept') && mockedAPI)
    ? baseAllCoinsUrl
    : `${baseAllCoinsUrl}?skip=0&currency=USD`;
};

export const coinHistoryUrlById = (coinId, mockedAPI = null) => {
  const baseCoinHistoryUrlById = 'https://api.coinstats.app/public/v1/charts';

  return ((process.env.REACT_APP_API === 'intercept') && mockedAPI)
    ? baseCoinHistoryUrlById
    : `${baseCoinHistoryUrlById}?period=1w&coinId=${coinId}`;
};

export const coinMarketsUrlById = (coinId, mockedAPI = null) => {
  const baseCoinMarketsUrlById = 'https://api.coinstats.app/public/v1/markets';

  return ((process.env.REACT_APP_API === 'intercept') && mockedAPI)
    ? baseCoinMarketsUrlById
    : `${baseCoinMarketsUrlById}?coinId=${coinId}`;
};

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
