import type { Card } from '../../../app/types';

import { Component, type ReactNode } from 'react';
import styles from './CardItem.module.css';

type CardItemProps = {
  card: Card;
};

export default class CardItem extends Component<CardItemProps> {
  render(): ReactNode {
    return (
      <div className={styles.card} key={this.props.card.name}>
        <img
          src={this.props.card.imageURL}
          alt={this.props.card.name}
          className={styles.img}
        />
        <div>
          <h3 className={styles.title}>{this.props.card.name}</h3>
          <p className={styles.info}>
            Birth year: {this.props.card.birth_year}
          </p>
          <p className={styles.info}>Home world: {this.props.card.homeworld}</p>
        </div>
      </div>
    );
  }
}
