import { useEffect, type FC } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { useThemeStore } from '../../../store/useTheme';
import styles from './Layout.module.css';

const Layout: FC = () => {
  const isLightTheme = useThemeStore((state) => state.isLight);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const theme = isLightTheme ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
  }, [isLightTheme]);

  return (
    <>
      <header className="wrapper header">
        <nav>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            About
          </NavLink>
        </nav>

        <span
          className={`material-symbols-outlined ${styles.theme_switch} ${isLightTheme ? styles.light : styles.dark}`}
          onClick={toggleTheme}
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
