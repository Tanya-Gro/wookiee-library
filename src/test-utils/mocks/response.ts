import type { Response } from '../../app/types';
import { mockCard } from './cards';

export const mockResponse: Response = {
  results: mockCard,
  next: null,
  previous: null,
  count: 1,
};
