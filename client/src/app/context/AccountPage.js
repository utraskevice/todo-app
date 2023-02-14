import React, { useState, useContext, useCallback } from 'react';
import AuthContext from './Auth';
import { API } from '../constants.js';

const ContentContext = React.createContext();

function ContentProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createTodo = async (todo_name) => {
    const userId = localStorage.getItem('user');
    if (!todo_name) {
      throw new Error('Fields cannot be Empty');
    } else {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API.tasks, {
          method: 'POST',
          headers: { authorization: token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, todo_name }),
        });

        if (response.status > 399 && response.status < 600) {
          throw new Error('failed to load');
        } else {
          const data = await response.json();
          console.log(data);
          getTodo();
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const getTodo = useCallback(
    async (e) => {
      setLoading(true);
      setError(null);

      const userId = localStorage.getItem('user');

      try {
        const response = await fetch(API.tasks + userId, {
          headers: { authorization: token },
        });

        if (response.status > 399 && response.status < 600) {
          throw new Error('failed to load');
        }

        const data = await response.json();
        console.log(data.todo);
        setTodo(data.todo);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateTodo = async (e, id) => {
    setLoading(true);
    setError(null);

    const updateData = {
      user_name: e.target.update.value,
    };
    try {
      const response = await fetch(API.singleTask(id), {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      setTodo(todo.filter(({ _id: i }) => id !== i));

      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to update');
      } else {
        const data = await response.json();
        console.log(data);
        getTodo();
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (e, id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API.toggleFavorite(id), {
        method: 'PUT',
        headers: { authorization: token },
      });

      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to update');
      } else {
        const data = await response.json();
        console.log(data);
        getTodo();
      }
    } catch (error) {
      setError(true);
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
        throw new Error('Failed to update');
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      setError(true);
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
        loading,
        error,
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
