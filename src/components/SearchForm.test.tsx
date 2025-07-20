import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';
import { mockRequest } from '../test-utils/mocks/request';

const handleSearch = vi.fn();

describe('SearchForm', () => {
  it('render SearchForm', async () => {
    render(
      <SearchForm
        searchQuery=""
        isLoading={false}
        onSearchQueryChange={handleSearch}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input search_input');

    await userEvent.type(input, mockRequest.searchQuery);
    expect(input).toHaveValue(mockRequest.searchQuery);

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(handleSearch).toHaveBeenCalledWith(mockRequest.searchQuery);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
