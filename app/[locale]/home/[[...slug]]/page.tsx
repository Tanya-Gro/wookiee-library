import HomePage from '@/src/pages/home/Home';
import getCards from '@/src/api/getCards';

export function generateStaticParams(): Record<string, string[]>[] {
  return [{ slug: [''] }];
}

export default async function Page() {
  const data = await getCards('', 1);

  return <HomePage initialData={data} />;
}
