import { mockCoinsDetails } from './details/mockDataDetails';
import {
  mockBitcoin,
  mockEthereum,
  mockTether,
  mockBNB,
  mockUsdCoin,
} from './mockedCoins';

const mockCoins = {
  coins: [
    mockBitcoin,
    mockEthereum,
    mockTether,
    mockBNB,
    mockUsdCoin,
  ],
};

export {
  mockBitcoin, mockEthereum, mockTether, mockBNB, mockUsdCoin,
};

export { mockCoins, mockCoinsDetails };
