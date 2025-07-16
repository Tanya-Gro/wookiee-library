import type { Card, Response } from '../app/types';
import type { FetchError, DataType } from '../app/types';

import GetHomeworld from './GetHomeworld';
import GetImageURL from './GetImageURL';
import { CARDS_PER_PAGE, URLs } from '../app/constants';

async function getCards(
  searchQuery: string,
  currentPage: number
): Promise<DataType | FetchError> {
  try {
    const response = await fetch(
      `${URLs.people}${searchQuery ? `search=${searchQuery}&` : ''}page=${currentPage}`
    );

    if (!response.ok) {
      return { hasError: true, message: `${response.status}` };
    }

    const data: Response = await response.json();

    const cardsWithImagesHomes: Card[] = await Promise.all(
      data.results.map(async (card: Card) => {
        const id = getID(card.url);
        const imageURL = id ? await GetImageURL(id) : '';
        const homeworld = await GetHomeworld(card.homeworld);
        return {
          ...card,
          imageURL: imageURL || '',
          homeworld,
          id: id ? id : card.created,
        };
      })
    );

    return {
      cards: cardsWithImagesHomes,
      pageCount: Math.max(1, Math.ceil(data.count / CARDS_PER_PAGE)),
    };
  } catch (error) {
    return { hasError: true, message: String(error) };
  }
}

function getID(url: string): string | undefined {
  return url.split('/').at(-2);
}

export default getCards;
