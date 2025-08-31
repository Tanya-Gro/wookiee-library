import type { Data } from '@/schemas/types';

import styles from './Card.module.css';

type Props = {
  data: Data;
};

export default function Card({
  data: { name, age, email, gender, country, picture },
}: Props) {
  return (
    <div className={styles.card}>
      <p className={styles.p}>
        <strong>Name:</strong> {name}
      </p>
      <p className={styles.p}>
        <strong>Age:</strong> {age} years
      </p>
      <p className={styles.p}>
        <strong>Email:</strong> {email}
      </p>
      <p className={styles.p}>
        <strong>Gender:</strong> {gender}
      </p>
      <p className={styles.p}>
        <strong>Country:</strong> {country}
      </p>
      <p className={styles.p}>
        <strong>Picture:</strong>
        {picture ? (
          <img src={picture} alt="Preview" className={styles.preview} />
        ) : (
          'none'
        )}
      </p>
    </div>
  );
}
