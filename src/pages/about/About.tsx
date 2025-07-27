import type { ReactNode } from 'react';
import styles from './About.module.css';
import Footer from '../../components/UI/footer/Footer';
import { URLs } from '../../app/constants';

export default function AboutPage(): ReactNode {
  return (
    <>
      <main className={styles.about}>
        <h1 className={styles.title}>Wookiee library</h1>
        <p className={styles.subtitle}>
          This galaxy-sized app was created by <strong>Tatiana Grosul</strong>{' '}
          during the{' '}
          <a href={URLs.RSS} target="_blank" rel="noreferrer">
            Rolling Scopes School
          </a>{' '}
          React 2025 Q3 course.
          <br />
          The mission: to master the Force of React — using class components,{' '}
          error boundaries, testing, routing, and beyond.
        </p>
      </main>
      <Footer />
    </>
  );
}
