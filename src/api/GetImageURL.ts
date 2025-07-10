async function GetImageURL(id: string): Promise<string | undefined> {
  const URL = 'https://akabab.github.io/starwars-api/api/id/';

  try {
    const response = await fetch(`${URL}${id}.json`);

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
