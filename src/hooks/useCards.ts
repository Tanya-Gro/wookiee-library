import type { UseQueryResult } from '@tanstack/react-query';
import type { DataType, FetchError } from '../app/types';

import { useQuery } from '@tanstack/react-query';
import getCards from '../api/getCards';

export const useCards = (
  searchQuery: string,
  currentPage: number
): UseQueryResult<DataType | FetchError, Error> =>
  useQuery({
    queryKey: ['cards', searchQuery, currentPage],
    queryFn: () => getCards(searchQuery, currentPage),
  });
