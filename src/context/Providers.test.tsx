import { Providers } from './Providers';
import { render, screen } from '@testing-library/react';

it('Provider renders children correctly', () => {
  render(
    <Providers>
      <div data-testid="child" />
    </Providers>
  );

  expect(screen.getByTestId('child')).toBeInTheDocument();
});
