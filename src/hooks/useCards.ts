import type { UseQueryResult } from '@tanstack/react-query';
import type { DataType, FetchError } from '../app/types';

import { useQuery } from '@tanstack/react-query';
import getCards from '../api/getCards';

type Props = {
  searchQuery: string;
  currentPage: number;
  options?: { initialData?: DataType | FetchError };
};

export const useCards = ({
  searchQuery,
  currentPage,
  options,
}: Props): UseQueryResult<DataType | FetchError, Error> =>
  useQuery({
    queryKey: ['cards', searchQuery, currentPage],
    queryFn: () => getCards(searchQuery, currentPage),
    initialData: options?.initialData,
  });
