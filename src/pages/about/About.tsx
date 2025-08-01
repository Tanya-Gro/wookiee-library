import type { ReactNode } from 'react';
import { LINKS } from '../../app/constants';
import styles from './About.module.css';
import Footer from '../../components/UI/footer/Footer';

export default function AboutPage(): ReactNode {
  return (
    <>
      <div className={'wrapper column grow center ' + styles.about}>
        <h1 className={styles.title}>Wookiee library</h1>
        <p className={styles.subtitle}>
          This galaxy-sized app was created by <strong>Tatiana Grosul</strong>{' '}
          during the{' '}
          <a href={LINKS.RSS} target="_blank" rel="noreferrer">
            Rolling Scopes School
          </a>{' '}
          React 2025 Q3 course.
          <br />
          The mission: to master the Force of React — using class components,{' '}
          error boundaries, testing, routing, and beyond.
        </p>
      </div>
      <Footer />
    </>
  );
}
