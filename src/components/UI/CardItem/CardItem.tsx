import type { Card } from '../../../app/types';

import { Component, type ReactNode } from 'react';
import styles from './CardItem.module.css';

type CardItemProps = {
  card: Card;
};

export default class CardItem extends Component<CardItemProps> {
  render(): ReactNode {
    const { imageURL, name, birth_year, homeworld } = this.props.card;
    return (
      <div className={styles.card} key={name}>
        <img src={imageURL} alt={name} className={styles.img} />
        <div>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.info}>Birth year: {birth_year}</p>
          <p className={styles.info}>Home world: {homeworld}</p>
        </div>
      </div>
    );
  }
}
