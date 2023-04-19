import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <NavLink to="/" className="fsControls navLink">Home</NavLink>
    <NavLink to="/coins" className="fsControls navLink">Coins</NavLink>
  </nav>
);

export default NavBar;
