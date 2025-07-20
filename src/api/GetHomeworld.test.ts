import { URLs } from '../app/constants';
import { mockCard } from '../test-utils/mocks/cards';
import GetHomeworld from './GetHomeworld';

describe('GetHomeworld', () => {
  it('should returns Homeworld', async () => {
    const result = await GetHomeworld(URLs.planets + '1/');

    expect(result).toBe(mockCard[0].homeworld);
  });

  it('returns error if fetch throws', async () => {
    const result = await GetHomeworld(URLs.planets + '2/');

    expect(result).toBe(mockCard[2].homeworld);
  });

  it('returns hasError on failed response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network failure')))
    );

    const result = await GetHomeworld(URLs.planets + '1/');

    expect(result).toBe(mockCard[2].homeworld);
  });
});
