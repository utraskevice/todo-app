import React, { useId } from 'react';

import './index.css';

function Input({ label, name, id, type = 'text', onChange, placeholder }) {
  const generatedId = useId();

  return (
    <React.Fragment>
      {label && <label htmlFor={id || generatedId}>{label}</label>}
      <input
        className='Input'
        name={name}
        id={id || generatedId}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
}

export default Input;
