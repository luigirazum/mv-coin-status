import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { selectFilterBy } from '../../redux/coins/coinsSelectors';
import { selectCoinDetailsById, selectDetailsError } from '../../redux/details/detailsSelectors';
import { clearFilterCoins, filterCoins } from '../../redux/coins/coinsSlice';
import {
  CancelIcon,
  CoinIcon, CoinsIcon, GoBackIcon, HomeIcon, LensIcon,
} from './icons';

const NavBar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const coin = useSelector((store) => selectCoinDetailsById(store, id));
  const detailsError = useSelector(selectDetailsError);
  const filterBy = useSelector(selectFilterBy);

  const onChangeHandler = (e) => {
    const filter = e.target.value.trim().toLowerCase();
    if (filter) {
      dispatch(filterCoins(filter));
    } else {
      dispatch(clearFilterCoins());
    }
  };

  const onClickHandler = (e) => {
    const { id: btnId } = e.target;
    if (btnId.includes('cancel')) dispatch(clearFilterCoins());
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <header>
      <nav>
        {(!coin && !detailsError) ? (
          <>
            <NavLink to="/" end className="fsControls navLink">
              <HomeIcon />
              <span className="fsControls navName">Home</span>
            </NavLink>
            <NavLink to="." end className="fsControls navLink" id="cancel-filter" onClick={onClickHandler}>
              <CoinsIcon />
              <span className="fsControls navName">Coins</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to=".." relative="path" end className="fsControls navLink">
              <GoBackIcon />
            </NavLink>
            <NavLink to={id} end className="fsControls navLink navCoin">
              <CoinIcon />
              <span className="fsControls navName">{coin ? coin.name : `${id}coin`}</span>
            </NavLink>
          </>
        )}
      </nav>
      {(!(coin && id) && !(id && !coin)) && (
      <form id="filter" onSubmit={onSubmitHandler}>
        <input
          type="text"
          id="field"
          placeholder="filter by name/symbol"
          value={filterBy}
          onChange={onChangeHandler}
        />
        <button
          type="button"
          id="cancel"
          data-testid={`${filterBy ? 'cancel-btn' : 'filter-btn'}`}
          className={`ctrl-btn ${filterBy ? 'cancel-btn' : 'filter-btn'}`}
          onClick={onClickHandler}
        >
          {filterBy ? <CancelIcon /> : <LensIcon />}
        </button>
      </form>
      )}
    </header>
  );
};

export default NavBar;
