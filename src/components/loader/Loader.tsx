import type { FC, ReactNode } from 'react';

import styles from './Loader.module.css';

const Loader: FC = (): ReactNode => {
  return (
    <div className={styles.loader_wrapper}>
      <p className="info-message">Loading...</p>
      <div className={styles.loader} data-testid="loader" />
    </div>
  );
};

export default Loader;
