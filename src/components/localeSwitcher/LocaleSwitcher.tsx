'use client';

import { useI18n } from '@/src/i18n/i18n';
import Button from '../UI/button/Button';

export default function LocaleSwitcher(): React.ReactNode {
  const { locale, setLocale } = useI18n();

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button onClick={() => setLocale('en')} disabled={locale === 'en'}>
        EN
      </Button>
      <Button onClick={() => setLocale('ru')} disabled={locale === 'ru'}>
        РУ
      </Button>
    </div>
  );
}
