import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Coin from '../components/Coin';
import { selectAllCoinsIdsByFilter, selectFilterActive } from '../../redux/coins/coinsSelectors';
import { fetchCoins } from '../../redux/coins/coinsActions';

const AllCoins = () => {
  const filterActive = useSelector(selectFilterActive);
  const dispatch = useDispatch();

  const coinsIds = useSelector(
    (store) => selectAllCoinsIdsByFilter(store, filterActive),
    shallowEqual,
  );

  useEffect(() => {
    if (!(coinsIds.length > 0)) dispatch(fetchCoins());
  }, [coinsIds, dispatch]);

  return (
    <section className="allCoins">
      {coinsIds.map((coinId, index) => (
        <Link
          to={coinId}
          key={coinId}
          className={`coinLink ${(index % 2) === 0 ? 'evenCoin' : 'oddCoin'}`}
        >
          <Coin id={coinId} />
        </Link>
      ))}
    </section>
  );
};

export default AllCoins;
