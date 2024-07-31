import { create } from "zustand";

export const useStore = create((set) => ({
  condition: true, // 작품등록 = true, 작품수정 = false
  setCondition: (data) => set({ condition: data }),

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
  // 노드 가져오기
  // store.js

  edges: [],
  setEdges: (edges) => set({ edges }),
  removeEdge: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),

  backgroundColor: "#fff",
  setBackgroundColor: (data) => set({ backgroundColor: data }),

  backgroundImg: "",
  setBackgroundImg: (data) => set({ backgroundImg: data }),

  userId: "",
  setUserId: (data) => set({ userId: data }),
}));
