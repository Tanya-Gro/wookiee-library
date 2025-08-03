import type { FC } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { useThemeStore } from '../../../store/useTheme';
import styles from './Layout.module.css';

const Layout: FC = () => {
  const lightTheme = useThemeStore((state) => state.isLight);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const theme = lightTheme ? 'light' : 'dark';
  document.body.setAttribute('data-theme', theme);

  return (
    <>
      <header className="wrapper header">
        <nav>
          <NavLink to="/home" className="link">
            Home
          </NavLink>
          <NavLink to="/about" className="link">
            About
          </NavLink>
        </nav>

        <span
          className={`material-symbols-outlined ${styles.theme_switch} ${lightTheme ? styles.light : styles.dark}`}
          onClick={toggleTheme}
          title="Toggle theme"
          role="button"
        >
          {lightTheme ? 'light_mode' : 'dark_mode'}
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
