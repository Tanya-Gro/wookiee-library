import type { FC } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { useThemeStore } from '../../../store/useTheme';
import styles from './Layout.module.css';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Layout: FC = () => {
  const isLightTheme = useThemeStore((state) => state.isLight);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [storedTheme, setStoredTheme] = useLocalStorage(
    'isLightTheme',
    isLightTheme
  );

  if (isLightTheme !== storedTheme) {
    toggleTheme();
  }

  const theme = isLightTheme ? 'light' : 'dark';
  document.body.setAttribute('data-theme', theme);

  return (
    <>
      <header className="wrapper header">
        <nav>
          <NavLink to="/home" className={styles.link}>
            Home
          </NavLink>
          <NavLink to="/about" className={styles.link}>
            About
          </NavLink>
        </nav>

        <span
          className={`material-symbols-outlined ${styles.theme_switch} ${isLightTheme ? styles.light : styles.dark}`}
          onClick={() => setStoredTheme(!isLightTheme)}
          title="Toggle theme"
          role="button"
        >
          {isLightTheme ? 'light_mode' : 'dark_mode'}
        </span>
      </header>
      <main className="wrapper grow column">
        <hr />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
