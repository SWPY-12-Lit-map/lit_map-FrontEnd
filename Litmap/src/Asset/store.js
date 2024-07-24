import { create } from "zustand";

export const useStore = create((set) => ({
  workInfos: {},

  addWorkInfos: (data) => set({ workInfos: data }),
  removeWorkInfos: () => set({ workInfos: {} }),

  searchResult: {},
  addSearchResult: (data) => set({ searchResult: data }),
}));
