import React, { useState, useContext, useCallback } from 'react';
import AuthContext from './Auth';
import { API } from '../constants.js';

const ContentContext = React.createContext();

function ContentProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [todo, setTodo] = useState([]);
  const [errorType, setErrorType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(todo.todo_name);
  const error = {
    empty: 'Fields cannot be Empty',
    loads: 'Failed to load',
    request: 'Oops! Something expolded! 💥',
  }[errorType];

  const createTodo = async (todo_name) => {
    const userId = localStorage.getItem('user');
    if (!todo_name) {
      setErrorType('empty');
    } else {
      setLoading(true);
      setErrorType(null);
      try {
        const response = await fetch(API.tasks, {
          method: 'POST',
          headers: { authorization: token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, todo_name }),
        });

        if (response.status > 399 && response.status < 600) {
          setErrorType(response.status === 400 ? 'loads' : 'request');
        } else {
          const data = await response.json();
          console.log(data);
          getTodo();
        }
      } catch (error) {
        setErrorType('loads');
      } finally {
        setLoading(false);
      }
    }
  };

  const getTodo = useCallback(
    async (e) => {
      setLoading(true);
      setErrorType(null);

      const userId = localStorage.getItem('user');

      try {
        const response = await fetch(API.tasks + userId, {
          headers: { authorization: token },
        });

        if (response.status > 399 && response.status < 600) {
          setErrorType(response.status === 400 ? 'loads' : 'request');
        }

        const data = await response.json();
        console.log(data.todo);
        setTodo(data.todo);
      } catch (error) {
        setErrorType('loads');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateTodo = async (e, id, todo_name) => {
    setLoading(true);
    setErrorType(null);
    try {
      const response = await fetch(API.singleTask(id), {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo_name }),
      }).then();

      if (response.status > 399 && response.status < 600) {
        setErrorType(response.status === 400 ? 'loads' : 'request');
      } else {
        const data = await response.json();
        console.log(data);
        getTodo();
      }
    } catch (error) {
      setErrorType('loads');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (e, id) => {
    setLoading(true);
    setErrorType(null);

    try {
      const response = await fetch(API.toggleFavorite(id), {
        method: 'PUT',
        headers: { authorization: token },
      });

      if (response.status > 399 && response.status < 600) {
        setErrorType(response.status === 400 ? 'loads' : 'request');
      } else {
        const data = await response.json();
        console.log(data);
        getTodo();
      }
    } catch (error) {
      setErrorType('loads');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (e, id) => {
    try {
      const response = await fetch(API.singleTask(id), {
        method: 'DELETE',
        headers: { authorization: token },
      });
      setTodo(todo.filter(({ _id: i }) => id !== i));
      console.log(response);

      if (response.status > 399 && response.status < 600) {
        setErrorType(response.status === 400 ? 'loads' : 'request');
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      setErrorType('loads');
    }
  };

  return (
    <ContentContext.Provider
      value={{
        createTodo,
        getTodo,
        updateTodo,
        toggleFavorite,
        deleteTodo,
        todo,
        setTodo,
        loading,
        error,
        update,
        setUpdate,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

function withContent(Component) {
  return (props) => {
    const context = useContext(ContentContext);

    return <Component {...context} {...props} />;
  };
}

export { ContentProvider, withContent };
export default ContentContext;
