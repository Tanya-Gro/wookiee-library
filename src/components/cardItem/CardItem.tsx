'use client';

import type { Card } from '../../app/types';
import { useState, type FC, type MouseEvent, type ReactNode } from 'react';

import Image from 'next/image';

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
  const [src, setSrc] = useState(imageURL);
  return (
    <div className={styles.card} onClick={onClickCard} data-testid="card">
      <input
        type="checkbox"
        checked={isChecked}
        className={styles.checkbox}
        onClick={onToggleCheckbox}
        readOnly
      />
      <Image
        src={src}
        alt={name}
        width={200}
        height={300}
        className={styles.img}
        onError={() => setSrc('/fallback.png')}
      />
      <h3 className={styles.title}>{name}</h3>
    </div>
  );
};

export default CardItem;
