import type { ReactNode } from 'react';

import { useEffect } from 'react';
import { ThemeContext } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import useLocalStorage from '../hooks/useLocalStorage';

interface IProviders {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: IProviders): ReactNode => {
  const [isLightTheme, setIsLightTheme] = useLocalStorage('isLight', true);
  const toggleTheme = (): void => setIsLightTheme(!isLightTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
};
