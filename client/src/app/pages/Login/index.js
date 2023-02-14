import { useContext } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthContext from '../../context/Auth';

import './index.css';

function Login() {
  const { error, loading, login } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    login(email, password);
  };

  return (
    <div className='Login'>
      <form className='Login__form' onSubmit={onSubmit}>
        <Input name='email' label='Email' />
        <Input name='password' label='Password' type='password' />
        <Button disabled={loading} type='submit'>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
        {error && <p className='Login__error'>{error}</p>}
      </form>
      <hr />
      <div className='Signup__login'>
        <h2>Do not have account?</h2>
        <Button to='/signup'>Sign up</Button>
      </div>
    </div>
  );
}

export default Login;
