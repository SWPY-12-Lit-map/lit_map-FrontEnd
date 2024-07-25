import { create } from "zustand";

export const useStore = create((set) => ({
  workInfos: {},

  addWorkInfos: (data) => set({ workInfos: data }),
  removeWorkInfos: () => set({ workInfos: {} }),

  searchResult: {},
  addSearchResult: (data) => set({ searchResult: data }),

  imgUrl: "",
  setImgUrl: (data) => set({ imgUrl: data }),

  url: "",
  setUrl: (data) => set({ url: data }),

  read: false,
  setRead: (data) => set({ read: data }),
}));
