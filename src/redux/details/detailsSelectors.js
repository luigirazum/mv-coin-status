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

export const selectedCoinHasSvgIcon = (store) => {
  const { asset: coin } = store.details;
  if (!coin) return false;

  if (!Object.keys(coin).includes('svg')) return false;

  return true;
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
