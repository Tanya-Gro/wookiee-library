import type { FetchError, Response } from '../../app/types';
import { mockCard } from './cards';

export const mockResponse: Response = {
  results: mockCard,
  next: null,
  previous: null,
  count: 1,
};

export const mockServerError: FetchError = {
  hasError: true,
  message: 'Internal Server Error',
};
