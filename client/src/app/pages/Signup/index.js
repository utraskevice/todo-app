import { useContext } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthContext from '../../context/Auth';

import './index.css';

function Signup() {
  const { error, loading, signup } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name_surname, email, password, confirmPassword } =
      Object.fromEntries(new FormData(e.target));
    signup(name_surname, email, password, confirmPassword);
  };

  return (
    <div className='Signup'>
      <form className='Signup__form' onSubmit={onSubmit}>
        <Input name='email' label='Email' />
        <Input name='name_surname' label='Name and surname' />
        <Input name='password' label='Password' type='password' />
        <Input
          name='confirmPassword'
          label='Confirm password'
          type='password'
        />
        <Button disabled={loading} type='submit'>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
        {error && <p className='Signup__error'>{error}</p>}
      </form>
      <hr />
      <div className='Signup__login'>
        <h2>Allready have an account?</h2>
        <Button to='/login'>Login</Button>
      </div>
    </div>
  );
}

export default Signup;
