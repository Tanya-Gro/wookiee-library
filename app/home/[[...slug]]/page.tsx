import HomePage from '@/src/pages/home/Home';

export function generateStaticParams(): Record<string, string[]>[] {
  return [{ slug: [''] }];
}

export default function Page(): React.ReactNode {
  return (
    <>
      <HomePage />
    </>
  );
}
