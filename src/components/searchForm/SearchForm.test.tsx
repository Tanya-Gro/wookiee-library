import { render, screen } from '@testing-library/react';
import { mockRequest } from '../../test-utils/mocks/request';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

const handleSearch = vi.fn();
const queryClient = new QueryClient();

describe('SearchForm', () => {
  const ROLE_OPTIONS = { name: /search/i };

  it('render SearchForm', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchForm
          searchQuery=""
          isLoading={false}
          onSearchQueryChange={handleSearch}
        />
      </QueryClientProvider>
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input search_input');

    await userEvent.type(input, mockRequest.searchQuery);
    expect(input).toHaveValue(mockRequest.searchQuery);

    const button = screen.getByRole('button', ROLE_OPTIONS);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(handleSearch).toHaveBeenCalledWith(mockRequest.searchQuery);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
