import type { Card } from '../../../app/types';
import type { FC, ReactNode } from 'react';

import styles from './CardItem.module.css';

type CardItemProps = {
  card: Pick<Card, 'imageURL' | 'name'>;
  onClick: () => void;
};

const CardItem: FC<CardItemProps> = ({
  card: { imageURL, name },
  onClick,
}): ReactNode => {
  return (
    <div className={styles.card} onClick={onClick} data-testid="card">
      <img src={imageURL} alt={name} className={styles.img} />
      <h3 className={styles.title}>{name}</h3>
    </div>
  );
};

export default CardItem;
