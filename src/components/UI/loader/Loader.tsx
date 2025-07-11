import { Component, type ReactNode } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render(): ReactNode {
    return (
      <div className={styles.loader_wrapper}>
        <p className="info-message">Loading...</p>
        <div className={styles.loader}></div>
      </div>
    );
  }
}

export default Loader;
