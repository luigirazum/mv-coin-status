import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Coin = ({ id }) => {
  const [coin] = useSelector((store) => store.coins.assets.filter((coin) => coin.id === id));
  const {
    icon, name, symbol, rank,
  } = coin;

  return (
    <article className="coinItem">
      <div className="iconContainer">
        <img src={icon} className="coinIcon" alt={name} />
      </div>
      <h3>{name}</h3>
      <p>
        Symbol
        <span>{symbol}</span>
      </p>
      <p>
        Rank
        <span>{rank}</span>
      </p>
    </article>
  );
};

Coin.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Coin;
