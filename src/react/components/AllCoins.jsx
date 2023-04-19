import { useSelector, shallowEqual } from 'react-redux';
import Coin from './Coin';

const AllCoins = () => {
  const coins = useSelector((store) => store.coins.assets, shallowEqual);

  return (
    <section className="allCoins">
      {coins.map((coin) => (
        <Coin key={coin.id} id={coin.id} />
      ))}
    </section>
  );
};

export default AllCoins;
