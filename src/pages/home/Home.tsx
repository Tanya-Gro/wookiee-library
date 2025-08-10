import { useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Card } from '../../app/types';

import { isFetchError } from '../../helpers/isFetchError';
import getCards from '../../api/getCards';
import SearchForm from '../../components/searchForm/SearchForm';
import Pagination from '../../components/pagination/Pagination';
import Loader from '../../components/UI/loader/Loader';
import CardForm from '../../components/CardForm';
import useLocalStorage from '../../hooks/useLocalStorage';

const HomePage = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  useEffect(() => {
    if (currentPage !== Number(searchParams.get('page'))) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, searchParams, setSearchParams]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoading(true);
      const data = await getCards(searchQuery, currentPage);

      if (!isFetchError(data)) {
        setCards(data.cards);
        setPageCount(data.pageCount);
        setHasError(false);
      } else {
        setErrorMessage(data.message);
        setHasError(true);
      }
      setIsLoading(false);
    };
    getData();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (hasError) {
    throw new Error(errorMessage);
  }

  return (
    <>
      <SearchForm
        searchQuery={searchQuery}
        isLoading={isLoading}
        onSearchQueryChange={handleSearchChange}
      />
      {isLoading ? <Loader /> : <CardForm cards={cards} />}
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
      />
    </>
  );
};

export default HomePage;
