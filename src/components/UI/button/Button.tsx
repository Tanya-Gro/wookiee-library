import type { FC, MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}): ReactNode => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
