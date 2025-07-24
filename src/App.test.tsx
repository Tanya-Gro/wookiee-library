import type { DataType } from './app/types';

import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import { mockCard } from './test-utils/mocks/cards';

vi.mock('./api/getCards', () => ({
  default: (): DataType => ({
    cards: mockCard,
    pageCount: 1,
  }),
}));

describe('App', () => {
  it('render App', async () => {
    render(<App />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('card-form')).toBeInTheDocument();
    });
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });
});
