import type { Card, Response } from '../app/types';
import type { FetchError, DataType } from '../app/types';

import getDetails from './getDetails';
import { CARDS_PER_PAGE, LINKS } from '../app/constants';
import { isFetchError } from '../helpers/isFetchError';

async function getCards(
  searchQuery: string,
  currentPage: number
): Promise<DataType | FetchError> {
  try {
    const url = new URL(LINKS.characters);
    url.searchParams.set('search', searchQuery);
    url.searchParams.set('page', currentPage.toString());

    const response = await fetch(url);

    if (!response.ok) {
      return { hasError: true, message: `${response.status}` };
    }

    const data: Response = await response.json();

    const cardsWithImagesHomes: Card[] = await Promise.all(
      data.results.map(async (card: Card) => {
        const id = getID(card.url);
        const details = id ? await getDetails(id) : '';
        const imageURL = details && !isFetchError(details) ? details.image : '';
        return {
          ...card,
          imageURL: imageURL || '',
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
