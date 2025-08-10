import type { DataType } from '../../app/types';

import HomePage from './Home';
import { mockCard } from '../../test-utils/mocks/cards';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../api/getCards', () => ({
  default: async (): Promise<DataType> => ({
    cards: mockCard,
    pageCount: 1,
  }),
}));

describe('Home', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('render Home', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('card-form')).toBeInTheDocument();
    });
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
