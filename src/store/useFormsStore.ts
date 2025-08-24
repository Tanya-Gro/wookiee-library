import { create } from 'zustand';
import type { Data } from '@/schemas/types';

type FormsState = {
  forms: Data[];
  countries: string[];
  addUncontrolledForm: (data: Data) => void;
  addHookForm: (data: Data) => void;
  setCountry: (list: string[]) => void;
};

export const useFormsStore = create<FormsState>((set) => ({
  forms: [],
  countries: [],
  addUncontrolledForm: (data) =>
    set((state) => ({ forms: [...state.forms, data] })),
  addHookForm: (data) => set((state) => ({ forms: [...state.forms, data] })),
  setCountry: (list) => set(() => ({ countries: list })),
}));
