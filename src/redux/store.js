import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coins/coinsSlice';

const rootReducer = combineReducers({
  coins: coinsReducer,
});

const setupStore = (
  preloadedState,
) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default setupStore;
