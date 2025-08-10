import { render, screen } from '@testing-library/react';
import { mockCard } from '../../test-utils/mocks/cards';

import CardItem from './CardItem';
import styles from './CardItem.module.css';

describe('CardItem', () => {
  const ROLE_OPTIONS = { name: mockCard[0].name };

  it('render card elements', () => {
    render(
      <CardItem
        card={mockCard[0]}
        onClickCard={() => {}}
        onToggleCheckbox={() => {}}
        isChecked={false}
      />
    );

    const image = screen.getByRole('img', ROLE_OPTIONS);
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass(styles.img);
    expect(image).toHaveAttribute('src', mockCard[0].imageURL);
    expect(image).toHaveAttribute('alt', mockCard[0].name);

    const name = screen.getByRole('heading', ROLE_OPTIONS);
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass(styles.title);
  });
});
