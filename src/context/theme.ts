import { createContext, useContext } from 'react';

interface IThemeContext {
  isLightTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  isLightTheme: true,
  toggleTheme: () => {},
});

export const useTheme = (): IThemeContext => useContext(ThemeContext);
