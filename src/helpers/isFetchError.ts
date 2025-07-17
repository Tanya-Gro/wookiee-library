import type { FetchError, DataType } from '../app/types';

export function isFetchError(data: DataType | FetchError): data is FetchError {
  return 'message' in data;
}
