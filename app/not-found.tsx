'use client';

import Button from '@/src/components/UI/button/Button';
import styles from '@/app/not-found/not-found.module.css';

export default function Page(): React.ReactNode {
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
