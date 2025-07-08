import { Component, type ChangeEventHandler, type ReactNode } from 'react';
import styles from './MyInput.module.css';

type MyInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  name: string;
  value: string;
};

class MyInput extends Component<MyInputProps> {
  render(): ReactNode {
    const { onChange, ...props } = this.props;

    return (
      <input {...props} className={styles.my_input} onChange={onChange}></input>
    );
  }
}

export default MyInput;
