import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { selectFilterBy } from '../../redux/coins/coinsSelectors';
import { selectCoinDetailsById, selectDetailsError } from '../../redux/details/detailsSelectors';
import { clearFilterCoins, filterCoins } from '../../redux/coins/coinsSlice';
import { resetDetails } from '../../redux/details/detailsSlice';

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

  const onClickHandler = () => {
    dispatch(clearFilterCoins());
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onClickLinkHandler = () => {
    dispatch(resetDetails());
  };

  return (
    <header>
      <nav>
        {(!coin && !detailsError) ? (
          <>
            <NavLink to="/" end className="fsControls navLink">Home</NavLink>
            <NavLink to="." end className="fsControls navLink" onClick={onClickHandler}>Coins</NavLink>
          </>
        ) : (
          <>
            <NavLink to=".." relative="path" end className="fsControls navLink" onClick={onClickLinkHandler}>&lt;</NavLink>
            <NavLink to={id} end className="fsControls navLink">{coin ? coin.name : `${id}coin`}</NavLink>
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
          id="reset"
          className="ctrl-btn"
          onClick={onClickHandler}
        >
          X
        </button>
      </form>
      )}
    </header>
  );
};

export default NavBar;
