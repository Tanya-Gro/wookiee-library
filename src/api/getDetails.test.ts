import { mockResponse } from '../test-utils/mocks/response';
import getDetails from './getDetails';

describe('getDetails', () => {
  it('should returns URL', async () => {
    const result = await getDetails(mockResponse.results[0].id);

    expect(result).toBe(mockResponse.results[0].imageURL);
  });

  it('returns error if fetch throws', async () => {
    const result = await getDetails('999');

    expect(result).toBeUndefined();
  });

  it('returns hasError on failed response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network failure')))
    );

    const result = await getDetails(mockResponse.results[0].id);

    expect(result).toBeUndefined();
  });
});
