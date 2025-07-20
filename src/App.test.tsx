import type { ReactNode } from 'react';
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

vi.mock('./components/SearchForm', () => ({
  default: (): ReactNode => {
    return <div data-testid="SearchForm">Looking for</div>;
  },
}));

vi.mock('./components/CardForm', () => ({
  default: (): ReactNode => {
    return <div data-testid="CardForm">Cards</div>;
  },
}));

vi.mock('./components/Pagination', () => ({
  default: (): ReactNode => {
    return <div data-testid="Pagination">Page</div>;
  },
}));

vi.mock('./helpers/isFetchError', () => ({
  isFetchError: (): boolean => false,
}));

describe('App', () => {
  it('render App', async () => {
    render(<App />);

    expect(screen.getByTestId('SearchForm')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('CardForm')).toBeInTheDocument();
    });
    expect(screen.getByTestId('Pagination')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });
});
