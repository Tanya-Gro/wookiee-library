import { Component, type ReactNode } from 'react';
import styles from './MyLoader.module.css';

class MyLoader extends Component {
  render(): ReactNode {
    return (
      <div className={styles.loader_wrapper}>
        <p className="info-message">Loading...</p>
        <div className={styles.loader} />
      </div>
    );
  }
}

export default MyLoader;
