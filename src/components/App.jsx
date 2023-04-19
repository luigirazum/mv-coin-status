import { useDispatch } from 'react-redux';
import '../styles/App.css';
import { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Outlet,
} from 'react-router-dom';
import { fetchCoins } from '../redux/coins/coinsActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<h1>HOME</h1>} />
        <Route
          path="coins"
          caseSensitive
          element={
            (
              <>
                <h3>NAVIGATION AT COINS</h3>
                <Outlet />
              </>
)
            }
        >
          <Route index caseSensitive element={<h3>LIST OF COINS</h3>} />
          <Route path=":coin" caseSensitive element={<h4>DETAILS FOR A COIN</h4>} />
        </Route>
        <Route path="*" element={<h3>ERROR</h3>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
