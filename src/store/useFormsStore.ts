import { create } from 'zustand';

import type { Data } from '@/schemas/types';

export const COUNTRIES = ['Moldova', 'Russia', 'Ukraine', 'Belarus', 'Poland'];

type FormsState = {
  forms: Data[];
  countries: string[];
  addForm: (data: Data) => void;
  addCountry: (list: string[]) => void;
};

export const useFormsStore = create<FormsState>((set) => ({
  forms: [],
  countries: COUNTRIES,
  addForm: (data) => set((state) => ({ forms: [...state.forms, data] })),
  addCountry: (list) => set(() => ({ countries: list })),
}));
