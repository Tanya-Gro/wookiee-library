'use client';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeContext } from '@/src/context/theme';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import { LanguageProvider } from '@/src/i18n/i18n';
import { NextIntlClientProvider } from 'next-intl';

interface IProviders {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: IProviders): React.ReactNode => {
  const [isLightTheme, setIsLightTheme] = useLocalStorage('isLight', true);
  const toggleTheme = (): void => setIsLightTheme(!isLightTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider locale="en">
          <LanguageProvider>{children}</LanguageProvider>
        </NextIntlClientProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
};
