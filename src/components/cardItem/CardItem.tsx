import type { Card } from '../../../app/types';
import type { FC, MouseEvent, ReactNode } from 'react';

import styles from './CardItem.module.css';

type CardItemProps = {
  card: Pick<Card, 'imageURL' | 'name'>;
  onClickCard: () => void;
  onToggleCheckbox: (event: MouseEvent<HTMLInputElement>) => void;
  isChecked: boolean;
};

const CardItem: FC<CardItemProps> = ({
  card: { imageURL, name },
  onClickCard,
  onToggleCheckbox,
  isChecked,
}): ReactNode => {
  return (
    <div className={styles.card} onClick={onClickCard} data-testid="card">
      <input
        type="checkbox"
        checked={isChecked}
        className={styles.checkbox}
        onClick={onToggleCheckbox}
        readOnly
      />
      <img src={imageURL} alt={name} className={styles.img} />
      <h3 className={styles.title}>{name}</h3>
    </div>
  );
};

export default CardItem;
