import { Component, type ReactNode } from 'react';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

class Pagination extends Component<PaginationProps> {
  render(): ReactNode {
    const { currentPage, pageCount, isLoading, onPageChange } = this.props;

    return (
      <>
        <hr />
        <div className="wrapper center" data-testid="pagination">
          <span
            className={`material-symbols-outlined ${currentPage === 1 || isLoading ? 'disabled' : ''}`}
            onClick={() => {
              if (currentPage === 1 || isLoading) {
                return;
              }
              onPageChange(currentPage - 1);
            }}
          >
            arrow_back
          </span>
          <input
            value={`Page ${currentPage} of ${pageCount}`}
            className="input paginate_input"
            type="text"
            name="SearchInput"
            disabled
          />
          <span
            className={`material-symbols-outlined ${currentPage === pageCount || isLoading ? 'disabled' : ''}`}
            onClick={() => {
              if (currentPage === pageCount || isLoading) {
                return;
              }
              onPageChange(currentPage + 1);
            }}
          >
            arrow_forward
          </span>
        </div>
        <hr />
      </>
    );
  }
}

export default Pagination;
