/** ------------------------------------------------
 *   > selectDetails for the selected Coin
 *  ------------------------------------------------ */
export const selectCoinDetailsById = (store, id) => {
  const { asset: storedCoin } = store.details;
  if (storedCoin && (storedCoin.id === id)) {
    return storedCoin;
  }

  return null;
};

/** ------------------------------------------------
 *   > selectors for Status
 *  ------------------------------------------------ */
export const selectDetailsIsIdle = (store) => store.details.status.type === 'idle';
export const selectDetailsIsLoading = (store) => store.details.status.type === 'loading';

/** ------------------------------------------------
 *   > selectors for Status
 *  ------------------------------------------------ */
export const selectDetailsError = (store) => store.details.error;
