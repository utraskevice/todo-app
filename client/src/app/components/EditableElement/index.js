import { useState } from 'react';

import './index.css';

const InlineEdit = ({ value, setValue }) => {
  const [editing, setEditing] = useState(value);

  const onChange = (e) => setEditing(e.target.value);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.target.blur();
    }
  };

  const onBlur = (e) => {
    if (e.target.value.trim() === '') {
      setEditing(value);
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <input
      className='InlineEdit'
      type='text'
      aria-label='Field name'
      value={editing}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    ></input>
  );
};

export default InlineEdit;
