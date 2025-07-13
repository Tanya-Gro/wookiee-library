import { Component, type ReactNode } from 'react';
import MyInput from './UI/input/MyInput';

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
        <div className="wrapper center">
          <span
            className={`material-symbols-outlined ${currentPage === 1 || isLoading ? 'disabled' : ''}`}
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            arrow_back
          </span>
          <MyInput
            value={`Page ${currentPage} of ${pageCount}`}
            className="paginate_input"
            type="text"
            name="SearchInput"
            disabled
          />
          <span
            className={`material-symbols-outlined ${currentPage === pageCount || isLoading ? 'disabled' : ''}`}
            onClick={() => {
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
