import '../../index.css';
import { ClientOnly } from './client';

export function generateStaticParams(): Record<string, string[]>[] {
  return [{ slug: [''] }];
}

export default function Page(): React.ReactNode {
  return <ClientOnly />;
}
