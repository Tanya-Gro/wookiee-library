'use client';

import styles from './not-found.module.css';
import BackButton from '@/src/components/UI/button/BackButton';
import { useI18n } from '@/src/i18n/i18n';

export default function NotFoundClient(): React.ReactNode {
  const { t } = useI18n();
  return (
    <div className={styles.not_found}>
      <h2 className={styles.title}>404 - {t('NotFound.header')}</h2>
      <p className={styles.subtitle}>{t('NotFound.title')}</p>
      <BackButton />
    </div>
  );
}
