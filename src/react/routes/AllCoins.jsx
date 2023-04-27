import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Coin from '../components/Coin';
import { selectAllCoinsIdsByFilter, selectFilterActive } from '../../redux/coins/coinsSelectors';
import { fetchDetails } from '../../redux/details/detailsActions';

const AllCoins = () => {
  const filterActive = useSelector(selectFilterActive);
  const dispatch = useDispatch();

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
          onClick={() => dispatch(fetchDetails(coinId))}
          className={`coinLink ${(index % 2) === 0 ? 'evenCoin' : 'oddCoin'}`}
        >
          <Coin id={coinId} />
        </Link>
      ))}
    </section>
  );
};

export default AllCoins;
