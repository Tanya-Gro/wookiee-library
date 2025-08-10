import type { FC } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../../context/theme';
import styles from './Layout.module.css';
import classNames from 'classnames';

const Layout: FC = () => {
  const { isLightTheme, toggleTheme } = useTheme();

  return (
    <>
      <header className="wrapper header">
        <nav>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              classNames(styles.link, { [styles.active]: isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              classNames(styles.link, { [styles.active]: isActive })
            }
          >
            About
          </NavLink>
        </nav>

        <span
          className={classNames(
            'material-symbols-outlined',
            styles.theme_switch,
            {
              [styles.light]: isLightTheme,
              [styles.dark]: !isLightTheme,
            }
          )}
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
