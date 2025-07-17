import { Component, type MouseEventHandler, type ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

class Button extends Component<ButtonProps> {
  render(): ReactNode {
    const { children, onClick, disabled = false } = this.props;
    return (
      <button className={styles.button} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
}

export default Button;
