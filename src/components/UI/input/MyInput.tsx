import { Component, type ChangeEventHandler, type ReactNode } from 'react';
import styles from './MyInput.module.css';

type MyInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  name: string;
  value: string;
  className: string;
  disabled?: boolean;
};

class MyInput extends Component<MyInputProps> {
  render(): ReactNode {
    const { onChange, className, ...props } = this.props;

    return (
      <input
        {...props}
        className={styles[className]}
        onChange={onChange}
      ></input>
    );
  }
}

export default MyInput;
