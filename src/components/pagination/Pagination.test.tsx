import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const currentPage = 2;
const pageCount = 6;

type ISetSearchParams = (params: Record<string, string>) => void;
let setSearchParams: ISetSearchParams;

describe('Pagination', () => {
  beforeEach(() => {
    setSearchParams = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useSearchParams: (): (ISetSearchParams | URLSearchParams)[] => [
          new URLSearchParams(`page=${currentPage}`),
          setSearchParams,
        ],
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('render Pagination', async () => {
    render(
      <MemoryRouter initialEntries={[`/home?page=${currentPage}`]}>
        <Pagination pageCount={pageCount} isLoading={false} />
      </MemoryRouter>
    );

    const arrowBack = screen.getByText(/arrow_back/i);
    const input = screen.getByRole('textbox');
    const arrowForward = screen.getByText(/arrow_forward/i);

    expect(arrowBack).toBeInTheDocument();
    expect(arrowBack).toHaveClass(/material-symbols-outlined/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input paginate_input');

    expect(arrowForward).toBeInTheDocument();
    expect(arrowForward).toHaveClass(/material-symbols-outlined/i);

    await userEvent.click(arrowBack);
    expect(setSearchParams).toHaveBeenCalledWith({
      page: (currentPage - 1).toString(),
    });
    expect(setSearchParams).toHaveBeenCalledTimes(1);

    expect(input).toHaveValue(`Page ${currentPage} of ${pageCount}`);

    await userEvent.click(arrowForward);
    expect(setSearchParams).toHaveBeenCalledWith({
      page: (currentPage + 1).toString(),
    });
    expect(setSearchParams).toHaveBeenCalledTimes(2);
  });

  it('Disable page change arrows on load', async () => {
    render(
      <MemoryRouter initialEntries={[`/home?page=${currentPage}`]}>
        <Pagination pageCount={pageCount} isLoading={true} />
      </MemoryRouter>
    );

    const arrowBack = screen.getByText(/arrow_back/i);
    const arrowForward = screen.getByText(/arrow_forward/i);

    expect(arrowBack).toHaveClass(/disabled/i);
    expect(arrowForward).toHaveClass(/disabled/i);

    await userEvent.click(arrowBack);
    expect(setSearchParams).not.toHaveBeenCalledWith();

    await userEvent.click(arrowForward);
    expect(setSearchParams).not.toHaveBeenCalledWith();
  });
});
