import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      const resp = await axios
        .get('https://api.coinstats.app/public/v1/coins?skip=0&currency=USD');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export default FETCH_COINS;

export { fetchCoins };
