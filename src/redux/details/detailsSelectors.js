/** ------------------------------------------------
 *   > selectDetails for the selected Coin
 *  ------------------------------------------------ */
export const selectCoinDetails = (store) => store.details.asset;

/** ------------------------------------------------
 *   > selectors for Status
 *  ------------------------------------------------ */
export const selectDetailsIsIdle = (store) => store.details.status.type === 'idle';
export const selectDetailsIsLoading = (store) => store.details.status.type === 'loading';

/** ------------------------------------------------
 *   > selectors for Status
 *  ------------------------------------------------ */
export const selectDetailsError = (store) => store.details.error;
