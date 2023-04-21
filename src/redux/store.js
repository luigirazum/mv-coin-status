import { combineReducers, configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coins/coinsSlice';
import detailsReducer from './details/detailsSlice';

const rootReducer = combineReducers({
  coins: coinsReducer,
  details: detailsReducer,
});

const setupStore = (
  preloadedState,
) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default setupStore;
