'use client';

import { useTheme } from '../../context/theme';

import Link from 'next/link';
import classNames from 'classnames';
import styles from './Layout.module.css';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): React.ReactNode => {
  const { isLightTheme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <header className="wrapper header">
        <nav>
          <Link
            href="/home"
            className={classNames(styles.link, {
              [styles.active]: pathname === '/home',
            })}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={classNames(styles.link, {
              [styles.active]: pathname === '/about',
            })}
          >
            About
          </Link>
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
        {children}
      </main>
    </>
  );
};

export default Layout;
