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
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Age:</strong> {age} years
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
      <p>
        <strong>Country:</strong> {country}
      </p>
      <p>
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
