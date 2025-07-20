import { mockCard } from '../test-utils/mocks/cards';
import { mockRequest, emptyMockRequest } from '../test-utils/mocks/request';
import getCards from './getCards';

vi.mock('./GetImageURL', () => ({
  default: vi.fn((id: string) => {
    if (id === '1') return Promise.resolve(mockCard[0].imageURL);
    if (id === '11') return Promise.resolve(mockCard[1].imageURL);
    return Promise.resolve(undefined);
  }),
}));

vi.mock('./GetHomeworld', () => ({
  default: vi.fn().mockResolvedValue(mockCard[0].homeworld),
}));

const { searchQuery, currentPage } = mockRequest;

describe('getCards', () => {
  it('returns cards and pageCount on success, check valid id', async () => {
    const result = await getCards(searchQuery, currentPage);

    expect(result).toHaveProperty('cards');
    expect(result).toHaveProperty('pageCount', 1);

    if ('cards' in result) {
      const firstCard = result.cards[0];

      expect(result.cards).toHaveLength(mockCard.length);
      expect(firstCard.imageURL).toBe(mockCard[0].imageURL);
      expect(firstCard.homeworld).toBe(mockCard[0].homeworld);
      expect(firstCard.id).toBe(mockCard[0].id);
    }
  });

  it('returns cards and pageCount on success, check invalid id', async () => {
    const result = await getCards(searchQuery, currentPage);

    expect('cards' in result).toBe(true);

    if ('cards' in result) {
      const cardWithBrockenId = result.cards[2];

      expect(cardWithBrockenId.id).toBe(mockCard[2].created);
      expect(cardWithBrockenId.imageURL).toBe('');
    }
  });

  it('returns processed cards and pageCount on success', async () => {
    const result = await getCards(searchQuery, currentPage);

    expect('cards' in result).toBe(true);

    if ('cards' in result) {
      const cardWithBrockenId = result.cards[2];

      expect(cardWithBrockenId.id).toBe(mockCard[2].created);
      expect(cardWithBrockenId.imageURL).toBe('');
    }
  });

  it('returns error if fetch throws', async () => {
    const { searchQuery, currentPage } = emptyMockRequest;

    const result = await getCards(searchQuery, currentPage);

    expect(result).toHaveProperty('hasError', true);
    expect(result).toHaveProperty('message');
  });

  it('returns hasError on failed response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => {
        throw new Error('Network failure');
      })
    );

    const result = await getCards(searchQuery, currentPage);

    expect(result).toEqual({
      hasError: true,
      message: 'Error: Network failure',
    });

    expect(result).toHaveProperty('hasError', true);
    expect(result).toHaveProperty('message', 'Error: Network failure');
  });
});
