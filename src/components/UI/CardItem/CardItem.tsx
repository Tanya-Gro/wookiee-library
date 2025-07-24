import type { Card } from '../../../app/types';
import type { FC, ReactNode } from 'react';

import styles from './CardItem.module.css';

type CardItemProps = {
  card: Card;
};

const CardItem: FC<CardItemProps> = ({
  card: { imageURL, name, birth_year, homeworld },
}): ReactNode => {
  return (
    <div className={styles.card} key={name} data-testid="card">
      <img src={imageURL} alt={name} className={styles.img} />
      <div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.info} data-testid="birth-year">
          Birth year: {birth_year}
        </p>
        <p className={styles.info} data-testid="home-world">
          Home world: {homeworld}
        </p>
      </div>
    </div>
  );
};

export default CardItem;
