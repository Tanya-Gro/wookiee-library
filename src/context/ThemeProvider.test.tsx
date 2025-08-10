import { ThemeProvider } from './ThemeProvider';
import { render, screen } from '@testing-library/react';

it('Provider renders children correctly', () => {
  render(
    <ThemeProvider>
      <div data-testid="child" />
    </ThemeProvider>
  );

  expect(screen.getByTestId('child')).toBeInTheDocument();
});
