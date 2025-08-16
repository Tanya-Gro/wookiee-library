import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  pageCount: number;
  isLoading: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  isLoading,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const onPageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

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
