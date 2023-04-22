import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchCoins } from '../redux/coins/coinsActions';
import Home from './routes/Home';
import CoinsLayout from './routes/CoinsLayout';
import AllCoins from './routes/AllCoins';
import CoinDetails from './routes/CoinDetails';
import '../styles/App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="coins" caseSensitive element={<CoinsLayout />}>
        <Route index caseSensitive element={<AllCoins />} />
        <Route path=":id" caseSensitive element={<CoinDetails />} />
      </Route>
      <Route path="*" element={<h3>ERROR</h3>} />
    </Routes>
  );
};

export default App;
