import type { Card } from '../app/types';

export const handleDownload = async (selectedCards: Card[]): Promise<void> => {
  const res = await fetch('/api/download-csv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(selectedCards),
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedCards.length}_wookiee_cards.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};
