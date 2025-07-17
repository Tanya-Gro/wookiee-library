import { URLs } from '../app/constants';

async function GetImageURL(id: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${URLs.image}${id}.json`);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return;
    }

    const data = await response.json();
    return data.image;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export default GetImageURL;
