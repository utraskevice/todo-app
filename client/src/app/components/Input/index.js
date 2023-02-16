import React, { useId } from 'react';
import cx from 'classnames';

import './index.css';

function Input({
  label,
  name,
  id,
  type = 'text',
  onChange,
  placeholder,
  size,
  value,
}) {
  const generatedId = useId();
  const className = cx('Input', {
    'Input--small': size === 'small',
  });
  return (
    <React.Fragment>
      {label && <label htmlFor={id || generatedId}>{label}</label>}
      <input
        className={className}
        name={name}
        id={id || generatedId}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </React.Fragment>
  );
}

export default Input;
