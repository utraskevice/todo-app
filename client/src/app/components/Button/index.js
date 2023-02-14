import { Link } from 'react-router-dom';
import cx from 'classnames';

import './index.css';

function Button({
  children,
  type = 'button',
  size,
  design,
  onClick,
  to,
  disabled,
  position,
}) {
  const Component = to ? Link : 'button';
  const buttonType = to ? null : type;
  const className = cx('Button', {
    'Button--small': size === 'small',
    'Button--icons': design === 'icons',
    'Button--home': position === 'home',
  });

  return (
    <Component
      disabled={disabled}
      to={to}
      onClick={onClick}
      type={buttonType}
      className={className}
    >
      {children}
    </Component>
  );
}

export default Button;
