import type { UseQueryResult } from '@tanstack/react-query';
import type { Details, FetchError } from '../app/types';

import { useQuery } from '@tanstack/react-query';
import getDetails from '../api/getDetails';

export const useCardDetails = (
  id: string
): UseQueryResult<Details | FetchError, Error> =>
  useQuery({
    queryKey: ['cardDescription', id],
    queryFn: () => getDetails(id),
    // select: data => !isFetchError(data) ? {data.cards, data.pageCount} : {}
    enabled: !!id,
  });
