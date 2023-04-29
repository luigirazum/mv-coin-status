import bitcoinHistory from './bitcoinHistory';
import bitcoinMarkets from './bitcoinMarkets';
import ethereumHistory from './ethereumHistory';
import ethereumMarkets from './ethereumMarkets';
import tetherHistory from './tetherHistory';
import tetherMarkets from './tetherMarkets';
import binanceCoinHistory from './binanceCoinHistory';
import binanceCoinMarkets from './binanceCoinMarkets';
import usdCoinHistory from './usdCoinHistory';
import usdCoinMarkets from './usdCoinMarkets';

export const mockCoinsDetails = {
  bitcoin: {
    history: bitcoinHistory,
    markets: [...bitcoinMarkets],
  },
  ethereum: {
    history: ethereumHistory,
    markets: [...ethereumMarkets],
  },
  tether: {
    history: tetherHistory,
    markets: [...tetherMarkets],
  },
  'binance-coin': {
    history: binanceCoinHistory,
    markets: [...binanceCoinMarkets],
  },
  'usd-coin': {
    history: usdCoinHistory,
    markets: [...usdCoinMarkets],
  },
};

export { bitcoinHistory, bitcoinMarkets };
