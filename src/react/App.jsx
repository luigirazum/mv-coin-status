import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchCoins } from '../redux/coins/coinsActions';
import Home from './routes/Home';
import CoinsContainer from './routes/CoinsContainer';
import AllCoins from './components/AllCoins';
import '../styles/App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="coins" caseSensitive element={<CoinsContainer />}>
          <Route index caseSensitive element={<AllCoins />} />
          <Route path=":coin" caseSensitive element={<h4>DETAILS FOR A COIN</h4>} />
        </Route>
        <Route path="*" element={<h3>ERROR</h3>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
