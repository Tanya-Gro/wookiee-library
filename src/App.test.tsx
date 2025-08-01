import type { DataType } from './app/types';

import App from './App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockCard } from './test-utils/mocks/cards';

vi.mock('./api/getCards', () => ({
  default: async (): Promise<DataType> => ({
    cards: mockCard,
    pageCount: 1,
  }),
}));

describe('App', () => {
  it('app has home page', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    expect(await screen.findByTestId('card-form')).toBeInTheDocument();
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
