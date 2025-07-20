import { mockCard } from '../test-utils/mocks/cards';
import { mockServerError } from '../test-utils/mocks/response';
import { isFetchError } from './isFetchError';

describe('isFetchError', () => {
  it('isFetchError return false', () => {
    const result = isFetchError({
      cards: mockCard,
      pageCount: 1,
    });

    expect(result).toBeFalsy();
  });

  it('isFetchError return true', () => {
    const result = isFetchError(mockServerError);

    expect(result).toBeTruthy();
  });
});
