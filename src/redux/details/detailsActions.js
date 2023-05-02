import { createAsyncThunk } from '@reduxjs/toolkit';
import getCoinDetails from '../api/apiLibrary';

/** -----------------------------------------------------
 *   > Action type definitions
 *  ----------------------------------------------------- */
const FETCH_DETAILS = 'details/fetchDetails';

/** -----------------------------------------------------
 *   > Action Thunks definitions
 *  ----------------------------------------------------- */
const fetchDetails = createAsyncThunk(
  FETCH_DETAILS,
  async (coinId, thunkAPI) => {
    try {
      const resp = await getCoinDetails(coinId, thunkAPI);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export { FETCH_DETAILS };

export { fetchDetails };
