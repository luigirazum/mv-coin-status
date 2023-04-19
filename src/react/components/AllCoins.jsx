import { useSelector } from 'react-redux';

const AllCoins = () => {
  const coins = useSelector((store) => store.coins.assets);

  return (
    <section>
      <h2>All Coins</h2>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coin.name}
            <p>{coin.rank}</p>
            <p>{coin.symbol}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AllCoins;
