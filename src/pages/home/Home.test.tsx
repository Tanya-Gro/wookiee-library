import type { DataType } from '../../app/types';

import HomePage from './Home';
import { mockCard } from '../../test-utils/mocks/cards';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('../../api/getCards', () => ({
  default: (): DataType => ({
    cards: mockCard,
    pageCount: 1,
  }),
}));

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
