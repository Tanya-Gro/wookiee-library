import { create } from 'zustand';

interface CheckListStore {
  selectedIds: string[];
  toggleId: (id: string) => void;
  deleteIds: () => void;
}

export const useCheckListStore = create<CheckListStore>((set) => ({
  selectedIds: [],
  toggleId: (id): void =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((existingId) => existingId !== id)
        : [...state.selectedIds, id],
    })),
  deleteIds: (): void => set(() => ({ selectedIds: [] })),
}));
