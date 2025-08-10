import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const handleSearch = vi.fn();

const props = {
  currentPage: 2,
  pageCount: 6,
};

describe('Pagination', () => {
  it('render Pagination', async () => {
    render(
      <Pagination
        currentPage={props.currentPage}
        pageCount={props.pageCount}
        isLoading={false}
        onPageChange={handleSearch}
      />
    );

    const arrowBack = screen.getByText(/arrow_back/i);
    expect(arrowBack).toBeInTheDocument();
    expect(arrowBack).toHaveClass(/material-symbols-outlined/i);

    await userEvent.click(arrowBack);
    expect(handleSearch).toHaveBeenCalledWith(props.currentPage - 1);
    expect(handleSearch).toHaveBeenCalledTimes(1);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input paginate_input');
    expect(input).toHaveValue(
      `Page ${props.currentPage} of ${props.pageCount}`
    );

    const arrowForward = screen.getByText(/arrow_forward/i);
    expect(arrowForward).toBeInTheDocument();
    expect(arrowForward).toHaveClass(/material-symbols-outlined/i);

    await userEvent.click(arrowForward);
    expect(handleSearch).toHaveBeenCalledWith(props.currentPage + 1);
    expect(handleSearch).toHaveBeenCalledTimes(2);
  });

  it('Disable page change arrows on load', async () => {
    render(
      <Pagination
        currentPage={props.currentPage}
        pageCount={props.pageCount}
        isLoading={true}
        onPageChange={handleSearch}
      />
    );

    const arrowBack = screen.getByText(/arrow_back/i);
    expect(arrowBack).toHaveClass(/disabled/i);
    await userEvent.click(arrowBack);
    expect(handleSearch).not.toHaveBeenCalledWith();

    const arrowForward = screen.getByText(/arrow_forward/i);
    expect(arrowForward).toHaveClass(/disabled/i);
    await userEvent.click(arrowForward);
    expect(handleSearch).not.toHaveBeenCalledWith();
  });
});
