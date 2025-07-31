import { render, screen } from '@testing-library/react';
import { mockCard } from '../test-utils/mocks/cards';
import CardForm from './CardForm';
import { MemoryRouter } from 'react-router-dom';

describe('CardForm', () => {
  it('render CardForm with cards', () => {
    render(
      <MemoryRouter>
        <CardForm cards={mockCard} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockCard.length);

    cards.forEach((card, i) => {
      expect(card).toHaveTextContent(mockCard[i].name);
    });
  });

  it('render CardForm without cards', () => {
    render(
      <MemoryRouter>
        <CardForm cards={[]} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });
});
