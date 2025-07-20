import type { ReactNode } from 'react';
import type { Card } from '../app/types';

import { render, screen } from '@testing-library/react';
import { mockCard } from '../test-utils/mocks/cards';
import CardForm from './CardForm';

vi.mock('./UI/CardItem/CardItem', () => ({
  default: ({ card }: { card: Card }): ReactNode => {
    return <div data-testid="card">{card.name}</div>;
  },
}));

describe('CardForm', () => {
  it('render CardForm with cards', () => {
    render(<CardForm cards={mockCard} />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockCard.length);

    cards.forEach((card, i) => {
      expect(card).toHaveTextContent(mockCard[i].name);
    });
  });

  it('render CardForm without cards', () => {
    render(<CardForm cards={[]} />);

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();

    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });
});
