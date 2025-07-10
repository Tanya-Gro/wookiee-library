import type { Card } from '../app/types';

import { Component, type ReactNode } from 'react';
import DataFetcher from '../api/DataFetcher';
import CardItem from './UI/CardItem/CardItem';

type CardFormProps = {
  searchQuery: string;
  currentPage: number;
  updatePagesCount: (count: number) => void;
};

type CardFormState = {
  cards: Card[];
};

class CardForm extends Component<CardFormProps, CardFormState> {
  state: CardFormState = {
    cards: [],
  };

  componentDidMount(): void {
    this.fetchCards();
  }

  componentDidUpdate(prevProps: CardFormProps): void {
    if (
      prevProps.currentPage !== this.props.currentPage ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.fetchCards();
    }
  }

  fetchCards(): void {
    const COUNT_CARDS_PER_PAGE = 10;

    DataFetcher(this.props.searchQuery, this.props.currentPage).then(
      async (data) => {
        if (data) {
          this.setState({ cards: data.cards });
          this.props.updatePagesCount(
            Math.ceil(data.totalCountCards / COUNT_CARDS_PER_PAGE)
          );
        }
      }
    );
  }

  render(): ReactNode {
    const { cards } = this.state;

    return (
      <>
        <hr />
        <div className="card-list wrapper">
          {cards.map((card) => (
            <CardItem card={card} key={card.created} />
          ))}
        </div>
      </>
    );
  }
}

export default CardForm;
