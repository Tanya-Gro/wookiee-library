import { create } from 'zustand';
import type { Card } from '../app/types';

interface CheckListStore {
  selectedCards: Card[];
  toggleCard: (card: Card) => void;
  deleteCards: () => void;
}

export const useCheckListStore = create<CheckListStore>((set) => ({
  selectedCards: [],
  toggleCard: (card): void =>
    set((state) => {
      const isExist = state.selectedCards.some(
        (existingCard) => existingCard.id === card.id
      );
      return {
        selectedCards: isExist
          ? state.selectedCards.filter(
              (existingCard) => existingCard.id !== card.id
            )
          : [...state.selectedCards, card],
      };
    }),
  deleteCards: (): void => set(() => ({ selectedCards: [] })),
}));
