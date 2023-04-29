import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCoinById } from '../../redux/coins/coinsSelectors';
import genericCoinIcon from '../../assets/logo/generic-crypto-mock-logo.svg';

const Coin = ({ id }) => {
  const coin = useSelector((store) => selectCoinById(store, id));
  const {
    icon, name, symbol, rank,
  } = coin;

  return (
    <article data-testid={id} className="coinItem">
      <section className="itemSection itemHeader">
        <h3 data-testid="coinName" className="itemName">{name}</h3>
        <div className="iconContainer">
          <img data-testid="coinLogo" src={process.env.REACT_APP_API === 'intercept' ? genericCoinIcon : icon} className="coinIcon" alt={name} />
        </div>
      </section>
      <section className="itemSection">
        <div className="itemDescription">
          <h3 className="itemCategory rankCategory">Rank</h3>
          <p data-testid="coinRank" className="itemData rankData">{rank}</p>
        </div>
        <div className="itemDescription">
          <h4 className="itemCategory">Symbol</h4>
          <p data-testid="coinSymbol" className="itemData">{symbol}</p>
        </div>
      </section>
    </article>
  );
};

Coin.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Coin;
