import type { ReactNode } from 'react';

import { useSearchParams } from 'react-router-dom';
import { isFetchError } from '../../helpers/isFetchError';
import { useCards } from '../../hooks/useCards';

import useLocalStorage from '../../hooks/useLocalStorage';
import SearchForm from '../../components/searchForm/SearchForm';
import Pagination from '../../components/pagination/Pagination';
import Loader from '../../components/loader/Loader';
import CardForm from '../../components/cardForm/CardForm';

const HomePage = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const { data, isLoading, isError, error } = useCards(
    searchQuery,
    currentPage
  );

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
    setSearchParams({ page: '1' });
  };

  if (data && isFetchError(data)) {
    return (
      <div className="wrapper grow center">
        <p className="info-message">Nothing found 😭</p>
      </div>
    );
  }

  return (
    <>
      <SearchForm
        searchQuery={searchQuery}
        isLoading={isLoading}
        onSearchQueryChange={handleSearchChange}
      />
      {isLoading ? <Loader /> : data && <CardForm cards={data.cards} />}
      {data && <Pagination pageCount={data.pageCount} isLoading={isLoading} />}
    </>
  );
};

export default HomePage;
