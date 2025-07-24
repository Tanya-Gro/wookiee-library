import type { Card } from '../app/types';

import { Component, type ReactNode } from 'react';
import CardItem from './UI/CardItem/CardItem';

type CardFormProps = {
  cards: Card[];
};

class CardForm extends Component<CardFormProps> {
  render(): ReactNode {
    const { cards } = this.props;

    return (
      <>
        <hr />
        <div className="card-list wrapper" data-testid="card-form">
          {cards.length ? (
            cards.map((card) => <CardItem card={card} key={card.id} />)
          ) : (
            <p className="info-message">Nothing found 😭</p>
          )}
        </div>
      </>
    );
  }
}

export default CardForm;
