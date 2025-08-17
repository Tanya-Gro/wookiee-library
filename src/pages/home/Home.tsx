'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { isFetchError } from '../../helpers/isFetchError';
import { useCards } from '../../hooks/useCards';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';

import SearchForm from '../../components/searchForm/SearchForm';
import Pagination from '../../components/pagination/Pagination';
import Loader from '../../components/loader/Loader';
import CardForm from '../../components/cardForm/CardForm';

import type { DataType, FetchError } from '@/src/app/types';

type HomePageProps = {
  initialData: DataType | FetchError;
};

const HomePage = ({ initialData }: HomePageProps): React.ReactNode => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  useEffect((): void => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const { data, isLoading, isError, error } = useCards({
    searchQuery: localSearchQuery,
    currentPage: currentPage,
    options: { initialData },
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
    setLocalSearchQuery(query);

    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', '1');
    router.push(`?${params.toString()}`);
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
