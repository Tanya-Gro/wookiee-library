import type { Card } from '@/src/app/types';

export async function POST(req: Request) {
  const selectedCards: Card[] = await req.json();

  const csvHeader = 'id,name,imageURL\n';
  const csvRows = selectedCards
    .map((card) => `${card.id},"${card.name}","${card.imageURL}"`)
    .join('\n');
  const csvContent = csvHeader + csvRows;

  return new Response(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${selectedCards.length}_wookiee_cards.csv"`,
    },
  });
}
