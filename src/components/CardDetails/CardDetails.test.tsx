import type { Details } from '../../app/types';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockDetails } from '../../test-utils/mocks/details';

import CardDetails from './CardDetails';

vi.mock('../../../api/getDetails', () => ({
  default: async (): Promise<Details> => mockDetails[0],
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: (): URLSearchParams[] => {
      const searchParams = new URLSearchParams({ page: '1', details: '1' });
      return [searchParams];
    },
    useNavigate: (): void => {
      vi.fn();
    },
  };
});

describe('CardDetails', () => {
  it('should render detail card', async () => {
    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor((): void => {
      expect(screen.getByText(/Details:/i)).toBeInTheDocument();
      expect(screen.getByText(mockDetails[0].name)).toBeInTheDocument();

      if (
        mockDetails[0].formerAffiliations &&
        mockDetails[0].formerAffiliations.length > 0
      ) {
        expect(
          screen.getByText(
            /Former Affiliations: {mockDetails[0].formerAffiliations[0]}/i
          )
        ).toBeInTheDocument();
      }

      expect(
        screen.getByRole('button', { name: /close/i })
      ).toBeInTheDocument();
    });
  });
});
