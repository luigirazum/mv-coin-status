import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allCoinsUrl } from '../api/apiLibrary';

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
        .get(allCoinsUrl());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export { FETCH_COINS };

export { fetchCoins };
