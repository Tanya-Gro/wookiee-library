import { type FC } from 'react';
import classNames from 'classnames';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageCount,
  isLoading,
  onPageChange,
}) => {
  const isPrevDisabled = currentPage === 1 || isLoading;
  const isNextDisabled = currentPage === pageCount || isLoading;
  return (
    <>
      <hr />
      <div className="wrapper center" data-testid="pagination">
        <span
          className={classNames('material-symbols-outlined', {
            disabled: isPrevDisabled,
          })}
          onClick={() => {
            if (!isPrevDisabled) {
              onPageChange(currentPage - 1);
            }
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
          className={classNames('material-symbols-outlined', {
            disabled: isNextDisabled,
          })}
          onClick={() => {
            if (!isNextDisabled) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          arrow_forward
        </span>
      </div>
      <hr />
    </>
  );
};

export default Pagination;
