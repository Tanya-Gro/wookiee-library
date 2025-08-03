import type { Card } from '../app/types';

export const handleDownload = (selectedCards: Card[]): string => {
  const csvHeader = 'id,name,imageURL\n';

  const csvRows = selectedCards
    .map((card) =>
      card === null ? '' : `${card.id},"${card.name}","${card.imageURL}"`
    )
    .join('\n');

  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: 'text/csv' });

  return URL.createObjectURL(blob);
};
