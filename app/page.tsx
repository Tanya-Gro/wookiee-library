import { redirect } from 'next/navigation';

export default function HomeRedirect(): void {
  redirect('/home');
}
