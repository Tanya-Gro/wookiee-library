import { useEffect, useState, type ReactNode } from 'react';
import type { Card } from '../../app/types';

import { isFetchError } from '../../helpers/isFetchError';
import getCards from '../../api/getCards';
import SearchForm from '../../components/SearchForm';
import Pagination from '../../components/Pagination';
import Loader from '../../components/UI/loader/Loader';
import CardForm from '../../components/CardForm';
import useLocalStorage from '../../hooks/useLocalStorage';

const HomePage = (): ReactNode => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoading(true);
      const data = await getCards(searchQuery, currentPage);

      if (!isFetchError(data)) {
        setCards(data.cards);
        setPageCount(data.pageCount);
        setIsLoading(false);
        setHasError(false);
      } else {
        setHasError(true);
        setErrorMessage(data.message);
        setIsLoading(false);
      }
    };
    getData();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
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
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
};

export default HomePage;
