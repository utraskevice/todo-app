import Background from '../../images/home-background.jpeg';
import Button from '../../components/Button';

import './index.css';

function Home() {
  return (
    <div className='Home'>
      <img className='Home_background' src={Background} alt={Background} />
      <h2 className='Home_title'>
        Keep calm <br />
        and <span>plan</span> on!
      </h2>
      <Button to='/signup' position='home'>
        Sign in
      </Button>
    </div>
  );
}

export default Home;
