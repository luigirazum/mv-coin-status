import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const CoinsContainer = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <Outlet />
    </div>
  </>
);

export default CoinsContainer;
