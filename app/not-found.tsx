import styles from '@/app/not-found/not-found.module.css';
import BackButton from './not-found/BackButton';

export default function Page(): React.ReactNode {
  return (
    <div className={styles.not_found}>
      <h2 className={styles.title}>404 - Not Found</h2>
      <p className={styles.subtitle}>
        This is not the page you&apos;re looking for...
      </p>
      <BackButton />
    </div>
  );
}
