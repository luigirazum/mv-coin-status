import { createSlice } from '@reduxjs/toolkit';
import { fetchCoins } from './coinsActions';

/** --------------------------------------------------
 *   > Set initialState for coins
 *  -------------------------------------------------- */
const initialState = {
  assets: [],
  status: { type: 'idle' },
  error: null,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
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

export default coinsSlice.reducer;
