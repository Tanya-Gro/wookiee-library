import type { FetchError, DataType, Details } from '../app/types';

export function isFetchError(
  data: DataType | FetchError | Details
): data is FetchError {
  return 'hasError' in data && data.hasError && 'message' in data;
}
