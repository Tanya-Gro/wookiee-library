import {
  Component,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode,
} from 'react';
import styles from './MyInput.module.css';

type MyInputProps = {
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type: string;
  name: string;
  value: string;
  className: string;
  disabled?: boolean;
};

class MyInput extends Component<MyInputProps> {
  render(): ReactNode {
    const { onBlur, onChange, className, ...props } = this.props;

    return (
      <input
        {...props}
        className={styles[className]}
        onBlur={onBlur}
        onChange={onChange}
      ></input>
    );
  }
}

export default MyInput;
