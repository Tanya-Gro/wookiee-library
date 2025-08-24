import { create } from 'zustand';
import type { Data } from '@/schemas/types';

type FormsState = {
  forms: Data[];
  countries: string[];
  addForm: (data: Data) => void;
  addCountry: (list: string[]) => void;
};

export const useFormsStore = create<FormsState>((set) => ({
  forms: [],
  countries: [],
  addForm: (data) => set((state) => ({ forms: [...state.forms, data] })),
  addCountry: (list) => set(() => ({ countries: list })),
}));
