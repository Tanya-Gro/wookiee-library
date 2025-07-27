import type { ReactNode } from 'react';
import styles from './Footer.module.css';
import { URLs } from '../../../app/constants';

function Footer(): ReactNode {
  return (
    <>
      <hr />
      <footer className="wrapper footer">
        <a
          className={styles.github_link}
          href={URLs.GitHub}
          target="_blank"
          aria-label="GitHub"
          rel="noreferrer"
        />
        <p className={styles.subtitle}>Ⓒ Tanya-Gro, 2025</p>
        <a
          className={styles.rss_link}
          href={URLs.RSS}
          target="_blank"
          aria-label="RS School"
          rel="noreferrer"
        />
      </footer>
    </>
  );
}

export default Footer;
