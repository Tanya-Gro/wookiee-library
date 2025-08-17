import { LINKS } from '../app/constants';
import type { Details, FetchError } from '../app/types';

async function getDetails(id: string): Promise<Details | FetchError> {
  try {
    const response = await fetch(`${LINKS.details}${id}.json`);

    if (!response.ok) {
      return { hasError: true, message: `${response.status}` };
    }

    const data: Details = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: String(error) };
  }
}

export default getDetails;
