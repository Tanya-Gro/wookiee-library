async function GetHomeworld(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) return 'N/A';

    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error('Fetch error:', error);
    return 'N/A';
  }
}

export default GetHomeworld;
