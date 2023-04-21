/** ------------------------------------------------
 *   > selectAllAssetsIds
 *  ------------------------------------------------ */
export const selectAllCoinsIds = (store) => store.coins.assets.map((asset) => asset.id);

/** ------------------------------------------------
 *   > select one Coin from the store
 *  ------------------------------------------------ */
export const selectCoinById = (store, id) => {
  const [selectedCoin] = store.coins.assets
    .filter((coin) => coin.id === id);
  return selectedCoin || false;
};

/** ------------------------------------------------
 *   > select filter.active
 *  ------------------------------------------------ */
export const selectFilterActive = (store) => store.coins.filter.active;

/** ------------------------------------------------
 *   > select filter.active
 *  ------------------------------------------------ */
export const selectFilterBy = (store) => store.coins.filter.by;

/** ------------------------------------------------
 *   > select All Coins from the store with Filter
 *  ------------------------------------------------ */
export const selectAllCoinsIdsByFilter = (store, filterActive) => {
  if (!filterActive) return selectAllCoinsIds(store);

  return store.coins.filter.assets.map((asset) => asset.id);
};
