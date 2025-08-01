import { isFetchError } from '../helpers/isFetchError';
import { mockDetails } from '../test-utils/mocks/details';
import getDetails from './getDetails';

describe('getDetails', () => {
  it('should return Details object', async (): Promise<void> => {
    const result = await getDetails(String(mockDetails[0].id));

    expect(isFetchError(result)).toBeFalsy();
    expect(result).toEqual(mockDetails[0]);
  });

  it('returns error if fetch throws', async (): Promise<void> => {
    const result = await getDetails('999');

    expect(isFetchError(result)).toBeTruthy();
  });

  it('returns hasError on failed response', async (): Promise<void> => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network failure')))
    );

    const result = await getDetails(String(mockDetails[0].id));

    expect(isFetchError(result)).toBeTruthy();
  });
});
