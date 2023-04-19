import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const CoinsContainer = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default CoinsContainer;
