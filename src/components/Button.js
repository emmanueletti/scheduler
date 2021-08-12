import React from 'react';
import cn from 'classnames';

import 'components/Button.scss';

const Button = ({ onClick, disabled, children, confirm, danger }) => {
  const buttonClass = cn('button', {
    'button--confirm': confirm,
    'button--danger': danger,
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
