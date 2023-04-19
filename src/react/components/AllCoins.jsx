import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import Coin from './Coin';

const AllCoins = () => {
  const coins = useSelector((store) => store.coins.assets, shallowEqual);

  return (
    <section className="allCoins">
      {coins.map((coin) => (
        <Link to={coin.id} key={coin.id} className="coinLink">
          <Coin id={coin.id} />
        </Link>
      ))}
    </section>
  );
};

export default AllCoins;
