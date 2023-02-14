import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, AUTH_TOKEN_STORAGE_KEY } from '../constants.js';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  );
  const [errorType, setErrorType] = useState(null);
  const [loading, setLoading] = useState(false);
  const error = {
    empty: 'Fields cannot be Empty',
    user: 'User allready exist',
    password: 'Password not match',
    credentials: 'Check login details',
    request: 'Oops! Something expolded! 💥',
  }[errorType];

  const logout = () => {
    setToken(null);
    window.localStorage.clear();
    navigate('/');
  };

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorType('empty');
    } else {
      setLoading(true);
      setErrorType(null);
      try {
        const response = await fetch(API.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        console.log(response);

        if (response.status > 399 && response.status < 600) {
          setErrorType(response.status === 400 ? 'credentials' : 'request');
        } else {
          const data = await response.json();

          localStorage.setItem('user', data.user._id);
          setToken(data.token);
          navigate('/user');
        }
      } catch (error) {
        setErrorType('credentials');
      } finally {
        setLoading(false);
      }
    }
  };

  const signup = async (name_surname, email, password, confirmPassword) => {
    if (!name_surname || !email || !password || !confirmPassword) {
      setErrorType('empty');
    } else if (password.value !== confirmPassword.value) {
      setErrorType('password');
    } else {
      setLoading(true);
      setErrorType(null);
      try {
        const response = await fetch(API.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name_surname,
            email,
            password,
            confirmPassword,
          }),
        });

        console.log(response);

        if (response.status > 399 && response.status < 600) {
          setErrorType(response.status === 400 ? 'credentials' : 'request');
        } else {
          const data = await response.json();

          console.log(data);
          setToken(data.token);
          navigate('/user');
        }
      } catch (error) {
        setErrorType('credentials');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, error, loading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
