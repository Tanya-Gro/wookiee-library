import type { ReactNode } from 'react';

import { LINKS } from '../../app/constants';
import styles from './Footer.module.css';

function Footer(): ReactNode {
  return (
    <>
      <hr />
      <footer className="wrapper footer">
        <a
          className={styles.github_link}
          href={LINKS.GitHub}
          target="_blank"
          aria-label="GitHub"
          rel="noreferrer"
        />
        <p className={styles.subtitle}>Ⓒ Tanya-Gro, 2025</p>
        <a
          className={styles.rss_link}
          href={LINKS.RSS}
          target="_blank"
          aria-label="RS School"
          rel="noreferrer"
        />
      </footer>
    </>
  );
}

export default Footer;
