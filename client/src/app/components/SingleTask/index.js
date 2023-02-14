import Icon from '../Icon';
import Button from '../Button';
import InlineEdit from '../EditableElement';

import './index.css';
import { useState } from 'react';

function SingleTask({
  id,
  todo_name,
  OnToggleFavorite,
  isfavorite,
  toEdit,
  toDelete,
  set,
}) {
  const [value, setValue] = useState(todo_name);
  return (
    <li className='SingleTask' draggable={true} id={id} isfavorite={isfavorite}>
      <InlineEdit value={value} setValue={setValue} />
      <div className='SingleTask__icons'>
        <Button design='icons' onClick={toEdit}>
          <Icon name='edit' />
        </Button>
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
