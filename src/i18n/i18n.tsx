'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/src/locales/en.json';
import ru from '@/src/locales/ru.json';

type Locale = 'en' | 'ru';
const DEFAULT_LOCALE: Locale = 'en';
const STORAGE_KEY = 'locale';

const messagesMap = { en, ru } as const;

type Messages = typeof en;

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedRaw = window.localStorage.getItem(STORAGE_KEY);
    let next: Locale = DEFAULT_LOCALE;

    if (savedRaw === 'ru' || savedRaw === 'en') {
      next = savedRaw;
    }

    if (!savedRaw) {
      window.localStorage.setItem(STORAGE_KEY, next);
    }

    setLocaleState(next);
    document.documentElement.setAttribute('lang', next);
  }, []);

  const setLocale = (l: Locale): void => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.setAttribute('lang', l);
    }
  };

  const messages: Messages = messagesMap[locale];
  const t = useMemo(() => {
    return (key: string): string => {
      const parts = key.split('.');
      let cur: unknown = messages;

      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = { cur }[p];
        } else {
          return key;
        }
      }

      return typeof cur === 'string' ? cur : key;
    };
  }, [messages]);

  const value: LanguageContextType = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
