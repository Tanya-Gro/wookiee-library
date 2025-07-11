import { Component, type ReactNode } from 'react';
import MyInput from './UI/input/MyInput';

type PaginationProps = {
  currentPage: number;
  countPages: number;
  onPageChange: (newPage: number) => void;
};

class Pagination extends Component<PaginationProps> {
  render(): ReactNode {
    const { currentPage, countPages } = this.props;

    return (
      <div className="wrapper center">
        <span
          className={`material-symbols-outlined ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => {
            this.props.onPageChange(currentPage - 1);
          }}
        >
          arrow_back
        </span>
        <MyInput
          value={`${currentPage} page of ${countPages}`}
          className="paginate_input"
          type="text"
          name="SearchInput"
          disabled
        />
        <span
          className={`material-symbols-outlined ${currentPage === countPages ? 'disabled' : ''}`}
          onClick={() => {
            this.props.onPageChange(currentPage + 1);
          }}
        >
          arrow_forward
        </span>
      </div>
    );
  }
}

export default Pagination;
