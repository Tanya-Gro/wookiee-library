import type { DataType } from '../../app/types';

import HomePage from './Home';
import { mockCard } from '../../test-utils/mocks/cards';
import { render, screen, waitFor } from '@testing-library/react';
import type * as ReactRouterDom from 'react-router-dom';

vi.mock('../../api/getCards', () => ({
  default: async (): Promise<DataType> => ({
    cards: mockCard,
    pageCount: 1,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof ReactRouterDom>('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(() => {
      const searchParams = new URLSearchParams({ page: '1' });
      const setSearchParams = vi.fn();
      return [searchParams, setSearchParams] as const;
    }),
    useNavigate: (): void => {
      vi.fn();
    },
  };
});

describe('Home', () => {
  it('render Home', async () => {
    render(<HomePage />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('card-form')).toBeInTheDocument();
    });
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
