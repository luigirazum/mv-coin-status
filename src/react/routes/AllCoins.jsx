import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import Coin from '../components/Coin';
import { selectAllCoinsIdsByFilter, selectFilterActive } from '../../redux/coins/coinsSelectors';

const AllCoins = () => {
  const filterActive = useSelector(selectFilterActive);

  const coinsIds = useSelector(
    (store) => selectAllCoinsIdsByFilter(store, filterActive),
    shallowEqual,
  );

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
