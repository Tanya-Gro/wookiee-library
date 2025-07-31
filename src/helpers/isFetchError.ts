import type { FetchError, DataType, Details } from '../app/types';

export function isFetchError(
  data: DataType | FetchError | Details
): data is FetchError {
  return 'message' in data;
}
