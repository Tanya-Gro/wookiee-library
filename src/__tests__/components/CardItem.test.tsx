import CardItem from '../../components/UI/CardItem/CardItem';
import { render, screen } from '@testing-library/react';
import { mockCard } from '../mock-data';

describe('CardItem', () => {
  it('render card elements', () => {
    render(<CardItem card={mockCard} />);

    const image = screen.getByRole('img', { name: mockCard.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCard.imageURL);
    expect(image).toHaveAttribute('alt', mockCard.name);

    expect(
      screen.getByRole('heading', { name: mockCard.name })
    ).toBeInTheDocument();

    const birthYear = screen.getByTestId('birth-year');
    expect(birthYear).toHaveTextContent(mockCard.birth_year);
    expect(birthYear).toBeInTheDocument();

    const homeWorld = screen.getByTestId('home-world');
    expect(homeWorld).toHaveTextContent(mockCard.homeworld);
    expect(homeWorld).toBeInTheDocument();
  });
});
