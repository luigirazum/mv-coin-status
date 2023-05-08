import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allCoinsUrl, coinSvgIconMonoUrlBySymbol } from '../api/apiLibrary';

/** -----------------------------------------------------
 *   > Action type definitions
 *  ----------------------------------------------------- */
const FETCH_COINS = 'coins/fetchCoins';

/** -----------------------------------------------------
 *   > Action Thunks definitions
 *  ----------------------------------------------------- */
const fetchCoins = createAsyncThunk(
  FETCH_COINS,
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(allCoinsUrl());
      const { data: { coins } } = resp;
      const options = {
        headers: { Accept: 'image/svg+xml' },
      };
      const coinsIconsMonoRequests = coins
        .map(({ symbol }) => axios.get(coinSvgIconMonoUrlBySymbol(symbol), options));
      const coinsIconsMono = await Promise.allSettled(coinsIconsMonoRequests);
      const resultsSvgsMono = coinsIconsMono
        .map((resp, index) => {
          const { status } = resp;
          if (status !== 'fulfilled') return null;

          const {
            value: {
              request: {
                responseXML,
              },
            },
          } = resp;

          const elem = responseXML.documentElement.cloneNode(true);
          elem.removeAttribute('xmlns:xlink');
          elem.removeAttribute('style');
          elem.setAttribute('fill', 'currentColor');
          elem.setAttribute('id', `${coins[index].id}-icon-${coins[index].symbol.toLowerCase()}-svg-mono`);
          const XMLS = new XMLSerializer();
          const elemXMLS = XMLS.serializeToString(elem);
          return elemXMLS;
        });
      const coinsSvgsMono = coins.map((coin, index) => {
        const svg = resultsSvgsMono[index];

        if (!svg) return coin;

        return ({
          ...coin,
          svg,
        });
      });

      return ({
        ...resp.data,
        coins: coinsSvgsMono,
      });
      // return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export { FETCH_COINS };

export { fetchCoins };
