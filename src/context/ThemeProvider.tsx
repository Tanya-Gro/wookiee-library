import { useEffect, type ReactNode } from 'react';
import { ThemeContext } from './theme';
import useLocalStorage from '../hooks/useLocalStorage';

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProvider): ReactNode => {
  const [isLightTheme, setIsLightTheme] = useLocalStorage('isLight', true);
  const toggleTheme = (): void => setIsLightTheme(!isLightTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
