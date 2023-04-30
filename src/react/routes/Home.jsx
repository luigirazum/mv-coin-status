import { Link } from 'react-router-dom';

const Home = () => (
  <main>
    <section className="home">
      <div className="wrapper">
        <h1>Welcome to CoinStatus</h1>
        <div>
          <p>Here you will find the most current information about your favorite crypto coin.</p>
          <p>Press the Start button below to explore the world of cryptocurrencies.</p>
        </div>
        <Link
          to="coins"
          className="fsControls btn btn-home btn-start"
        >
          Start
        </Link>
      </div>
    </section>
  </main>
);

export default Home;
