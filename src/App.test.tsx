import type { DataType } from './app/types';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockCard } from './test-utils/mocks/cards';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

vi.mock('./api/getCards', () => ({
  default: async (): Promise<DataType> => ({
    cards: mockCard,
    pageCount: 1,
  }),
}));

describe('App', () => {
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

  it('app has home page', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByTestId('card-form')).toBeInTheDocument();

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('app has AboutPage', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /wookiee library/i })
    ).toBeInTheDocument();
  });

  it('app has NotFoundPage', () => {
    render(
      <MemoryRouter initialEntries={['/hello']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /404 - not found/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});
