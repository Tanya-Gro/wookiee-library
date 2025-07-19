import CardItem from './CardItem';
import { render, screen } from '@testing-library/react';
import { mockCard } from '../../../test-utils/mocks/cards';
import styles from '../../components/UI/CardItem/CardItem.module.css';

describe('CardItem', () => {
  it('render card elements', () => {
    render(<CardItem card={mockCard[0]} />);

    const image = screen.getByRole('img', { name: mockCard[0].name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass(styles.img);
    expect(image).toHaveAttribute('src', mockCard[0].imageURL);
    expect(image).toHaveAttribute('alt', mockCard[0].name);

    const name = screen.getByRole('heading', { name: mockCard[0].name });
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass(styles.title);

    const birthYear = screen.getByTestId('birth-year');
    expect(birthYear).toBeInTheDocument();
    expect(birthYear).toHaveClass(styles.info);
    expect(birthYear).toHaveTextContent(mockCard[0].birth_year);

    const homeWorld = screen.getByTestId('home-world');
    expect(homeWorld).toBeInTheDocument();
    expect(homeWorld).toHaveClass(styles.info);
    expect(homeWorld).toHaveTextContent(mockCard[0].homeworld);
  });
});
