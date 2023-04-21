import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCoinById } from '../../redux/coins/coinsSelectors';

const Coin = ({ id }) => {
  const coin = useSelector((store) => selectCoinById(store, id));
  const {
    icon, name, symbol, rank,
  } = coin;

  return (
    <article className="coinItem">
      <section className="itemSection itemHeader">
        <h3 className="itemName">{name}</h3>
        <div className="iconContainer">
          <img src={icon} className="coinIcon" alt={name} />
        </div>
      </section>
      <section className="itemSection">
        <div className="itemDescription">
          <h3 className="itemCategory rankCategory">Rank</h3>
          <p className="itemData rankData">{rank}</p>
        </div>
        <div className="itemDescription">
          <h4 className="itemCategory">Symbol</h4>
          <p className="itemData">{symbol}</p>
        </div>
      </section>
    </article>
  );
};

Coin.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Coin;
