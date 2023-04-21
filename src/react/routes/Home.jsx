import { Link } from 'react-router-dom';

const Home = () => (
  <main>
    <h1>Welcome</h1>
    <Link
      to="coins"
      className="fsControls btn btn-home btn-start"
    >
      Start
    </Link>
    <Link
      to="/"
      className="fsControls btn btn-home btn-about"
    >
      About
    </Link>
  </main>
);

export default Home;
