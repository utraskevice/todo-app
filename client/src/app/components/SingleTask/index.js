import Icon from '../Icon';
import Button from '../Button';
import Input from '../Input';

import './index.css';
import { useState } from 'react';

function SingleTask({
  id,
  todo_name,
  OnToggleFavorite,
  isfavorite,
  toDelete,
  setUpdate,
  onChange,
  value,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleToggle = () => {
    setIsEdit(!isEdit);
  };

  return (
    <li className='SingleTask' draggable={true} id={id} isfavorite={isfavorite}>
      {isEdit ? (
        <Input
          size='small'
          type='text'
          value={value}
          placeholder={todo_name}
          name='updateTodo'
          onChange={onChange}
        />
      ) : (
        <span>{todo_name}</span>
      )}
      <div className='SingleTask__icons'>
        {isEdit ? (
          <Button design='icons' onClick={setUpdate}>
            <Icon name='done' />
          </Button>
        ) : (
          <Button design='icons' onClick={handleToggle}>
            <Icon name='edit' />
          </Button>
        )}
        <Button design='icons' onClick={toDelete}>
          <Icon name='delete' />
        </Button>
        <Button design='icons' onClick={OnToggleFavorite}>
          {isfavorite === 'true' ? (
            <Icon name='isFavorite' />
          ) : (
            <Icon name='addFavorite' />
          )}
        </Button>
      </div>
    </li>
  );
}

export default SingleTask;
