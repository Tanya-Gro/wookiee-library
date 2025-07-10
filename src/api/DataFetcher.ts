import type { Card } from '../app/types';
import GetHomeworld from './GetHomeworld';
import GetImageURL from './GetImageURL';

async function DataFetcher(
  searchQuery: string,
  currentPage: number
): Promise<{ cards: Card[]; totalCountCards: number } | undefined> {
  const URL = 'https://swapi.py4e.com/api/people/?';

  try {
    const response = await fetch(
      `${URL}${searchQuery ? `search=${searchQuery}&` : ''}page=${currentPage}`
    );

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return;
    }

    const data = await response.json();

    const cardsWithImagesHomes: Card[] = await Promise.all(
      data.results.map(async (card: Card) => {
        const id = getID(card.url);
        const imageURL = id ? await GetImageURL(id) : '';
        const homeworld = await GetHomeworld(card.homeworld);
        return { ...card, imageURL: imageURL || '', homeworld };
      })
    );

    return { cards: cardsWithImagesHomes, totalCountCards: data.count };
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function getID(url: string): string | undefined {
  return url.split('/').at(-2);
}

export default DataFetcher;
