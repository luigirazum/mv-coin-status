import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import genericCoinIcon from '../../assets/logo/generic-crypto-mock-logo.svg';
import { fetchDetails } from '../../redux/details/detailsActions';
import { selectCoinDetails, selectDetailsError, selectDetailsIsLoading } from '../../redux/details/detailsSelectors';

const CoinDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const coin = useSelector(selectCoinDetails);
  const detailsLoading = useSelector(selectDetailsIsLoading);
  const detailsError = useSelector(selectDetailsError);

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [id, dispatch]);

  if (detailsLoading) {
    return (
      <>
        <h3>Status</h3>
        <p>Loading...</p>
      </>
    );
  }

  if (detailsError) {
    return (
      <>
        <h4>Error</h4>
        <p>
          <span>{id}</span>
          is not a valid coin.
        </p>
        <p>Please select a Coin from the list.</p>
      </>
    );
  }

  return coin ? (
    <section className="coinDetails">
      <article data-testid={id} className="coin">
        <div className="coinBasics">
          <div className="iconContainer">
            <img data-testid="coinIcon" src={process.env.REACT_APP_API === 'intercept' ? genericCoinIcon : coin.icon} className="coinIcon" alt={coin.name} />
          </div>
          <section className="descriptionSection">
            <h3 data-testid="coinName" className="coinName">{coin.name}</h3>
            <h4 data-testid="coinSymbol" className="sectionCategory symbolCategory">Symbol</h4>
            <p className="sectionData symbolData">{coin.symbol}</p>
          </section>
        </div>
        {/* EOF .coinBasics */}
        <div className="coinDescription">
          <section className="descriptionSection">
            <h3 className="sectionCategory rankCategory">Rank</h3>
            <p data-testid="coinRank" className="sectionData rankData">{coin.rank}</p>
          </section>
          <section className="descriptionSection">
            <h4 className="sectionCategory">Price</h4>
            <p data-testid="coinPrice" className="sectionData">
              {coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <h4 className="sectionCategory">Volume</h4>
            <p data-testid="coinVolume" className="sectionData">
              {coin.volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </section>
          <section className="descriptionSection">
            <h4 className="sectionSubCategory">Price Change</h4>
            <h5 className="sectionTitle">1 hour</h5>
            <p data-testid="coinPrice1h" className="sectionData">
              {coin.priceChange1h.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <h5 className="sectionTitle">1 day</h5>
            <p data-testid="coinPrice1d" className="sectionData">
              {coin.priceChange1d.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <h5 className="sectionTitle">1 week</h5>
            <p data-testid="coinPrice1w" className="sectionData">
              {coin.priceChange1w.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </section>
        </div>
        {/* EOF .coinMore */}
      </article>
    </section>
  ) : (<h3>Select a Coin from the previous list.</h3>);
};

export default CoinDetails;
