import type { ReactNode } from 'react';
import styles from './NotFound.module.css';
import Button from '../../components/UI/button/Button';

export default function NotFoundPage(): ReactNode {
  const handleClick = (): void => {
    window.history.back();
  };

  return (
    <div className={styles.not_found}>
      <h2 className={styles.title}>404 - Not Found</h2>
      <p className={styles.subtitle}>
        This is not the page you&apos;re looking for...
      </p>
      <Button onClick={handleClick}>Back to base</Button>
    </div>
  );
}
