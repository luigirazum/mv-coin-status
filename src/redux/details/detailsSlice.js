import { createSlice } from '@reduxjs/toolkit';
import { fetchDetails } from './detailsActions';

const initialState = {
  asset: null,
  status: { type: 'idle' },
  error: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    resetDetails: (state) => ({
      ...state,
      asset: null,
      error: null,
    }),
  },
  extraReducers: (builder) => builder
    .addCase(fetchDetails.pending,
      (state) => ({
        ...state,
        asset: null,
        status: { type: 'loading' },
        error: null,
      }))
    .addCase(fetchDetails.fulfilled,
      (state, { payload }) => ({
        ...state,
        status: { type: 'idle' },
        asset: payload,
      }))
    .addCase(fetchDetails.rejected,
      (state, { payload }) => ({
        ...state,
        status: { type: 'idle' },
        error: payload,
      })),
});

export const { resetDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
