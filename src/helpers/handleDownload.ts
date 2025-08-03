import type { Details } from '../app/types';

import getDetails from '../api/getDetails';
import { isFetchError } from './isFetchError';

export const handleDownload = async (
  selectedCardIds: string[]
): Promise<void> => {
  const csvHeader = 'id,name,imageURL\n';

  const detailsList: (Details | null)[] = await Promise.all(
    selectedCardIds.map(async (id: string): Promise<Details | null> => {
      const details = await getDetails(id);
      return isFetchError(details) ? null : details;
    })
  );

  const csvRows = detailsList
    .map((card) =>
      card === null ? '' : `${card.id},"${card.name}","${card.image}"`
    )
    .join('\n');

  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 1000 * 60);
};
