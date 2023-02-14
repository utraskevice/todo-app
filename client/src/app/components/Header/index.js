import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

import logo from '../../images/logo.png';
import AuthContext from '../../context/Auth';
import './index.css';

function Header() {
  const { logout, token } = useContext(AuthContext);

  return (
    <header className='Header'>
      <div className='Header__container'>
        <Link to='/'>
          <img className='Header__logo' src={logo} alt='logo' />
        </Link>
        <Button to={token ? null : '/login'} onClick={token ? logout : null}>
          {token ? 'Log out' : 'Log in'}
        </Button>
      </div>
    </header>
  );
}

export default Header;
