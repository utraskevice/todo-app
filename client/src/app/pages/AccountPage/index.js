import SingleTask from '../../components/SingleTask';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

import './index.css';

import React, { useContext, useEffect } from 'react';
import ContentContext from '../../context/AccountPage';

function AccountPage() {
  const {
    error,
    loading,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    toggleFavorite,
    todo,
  } = useContext(ContentContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { addTodo } = Object.fromEntries(new FormData(e.target));

    createTodo(addTodo);
  };

  useEffect(
    (todo) => {
      getTodo(todo);
    },
    [getTodo]
  );

  if (loading) {
    return (
      <div className='AccountPage'>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className='AccountPage'>
      <form className='AddForm' onSubmit={onSubmit}>
        <Input name='addTodo' placeholder='Write something...' />
        <Button size='small' disabled={loading} type='submit'>
          {loading ? 'Loading...' : <Icon name='add' />}
        </Button>
      </form>
      {error && <p className='Error'>{error}</p>}
      <div className='TodoBoard'>
        <div className='Todo'>
          <h1>To do</h1>
          {todo.map((todo) => (
            <SingleTask
              id={todo._id}
              key={todo._id}
              status={todo.status}
              todo_name={todo.todo_name}
              toEdit={(e) => updateTodo(e, todo._id)}
              isfavorite={todo.isFavorite.toString()}
              OnToggleFavorite={(e) => toggleFavorite(e, todo._id)}
              toDelete={(e) => deleteTodo(e, todo._id)}
            />
          ))}
        </div>
        {/* <div className='InProgress'>
          <h1>In progress</h1>
        </div>
        <div className='Done'>
          <h1>Done</h1>
        </div> */}
      </div>
    </div>
  );
}

export default AccountPage;
