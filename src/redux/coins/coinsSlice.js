import { createSlice } from '@reduxjs/toolkit';
import { fetchCoins } from './coinsActions';

/** --------------------------------------------------
 *   > Set initialState for coins
 *  -------------------------------------------------- */
const initialState = {
  assets: [],
  status: { type: 'idle' },
  filter: { active: false, by: '' },
  error: null,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    filterCoins: (state, { payload }) => {
      const filteredAssets = state.assets
        .filter((asset) => (
          asset.name.toLowerCase().includes(payload)
        || asset.symbol.toLowerCase().includes(payload)
        ));

      return ({
        ...state,
        filter: {
          active: true,
          by: payload,
          assets: filteredAssets,
        },
      });
    },
    clearFilterCoins: (state) => ({
      ...state,
      filter: {
        active: false,
        by: '',
      },
    }),
  },
  extraReducers: (builder) => builder
  /** ------------------------------------------
   *   > when we launch the request
   *  ------------------------------------------ */
    .addCase(fetchCoins.pending,
      (state) => (
        {
          ...state,
          status: { type: 'loading' },
          error: null,
        }
      ))
  /** ------------------------------------------
   *   > if the coins are retrieved
   *  ------------------------------------------ */
    .addCase(fetchCoins.fulfilled,
      (state, { payload: { coins } }) => (
        {
          ...state,
          assets: coins,
          status: { type: 'idle' },
          error: null,
        }
      ))
  /** ------------------------------------------
   *   > if something happens
   *  ------------------------------------------ */
    .addCase(fetchCoins.rejected,
      (state, { payload }) => (
        {
          ...state,
          status: { type: 'idle' },
          error: payload,
        }
      )),
});

export const { filterCoins, clearFilterCoins } = coinsSlice.actions;

export default coinsSlice.reducer;
