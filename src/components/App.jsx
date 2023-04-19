import { useDispatch } from 'react-redux';
import '../styles/App.css';
import { useEffect } from 'react';
import { fetchCoins } from '../redux/coins/coinsActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <>
      <header>
        Main Nav
      </header>
      <main>
        Start Menu
      </main>
    </>
  );
};

export default App;
