import { create } from 'zustand';

interface ThemeStore {
  isLight: boolean;
  toggleTheme: () => void;
}

const LS_KEY = 'isLightTheme';
const stored = localStorage.getItem(LS_KEY);
const theme: boolean = stored ? JSON.parse(stored) : true;

export const useThemeStore = create<ThemeStore>((set) => ({
  isLight: theme,
  toggleTheme: (): void =>
    set((state) => {
      localStorage.setItem(LS_KEY, JSON.stringify(!state.isLight));
      return { isLight: !state.isLight };
    }),
}));
