import { Component, type MouseEventHandler, type ReactNode } from 'react';
import styles from './MyButton.module.css';

type MyButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

class MyButton extends Component<MyButtonProps> {
  render(): ReactNode {
    const { children, onClick } = this.props;
    return (
      <button className={styles.my_button} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default MyButton;
