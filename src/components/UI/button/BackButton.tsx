'use client';

import Button from '@/src/components/UI/button/Button';
import { useI18n } from '@/src/i18n/i18n';

export default function BackButton(): React.ReactNode {
  const { t } = useI18n();
  const handleClick = (): void => {
    window.history.back();
  };

  return <Button onClick={handleClick}>{t('Buttons.back')}</Button>;
}
