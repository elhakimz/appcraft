import {create} from 'zustand';

type PageState = {
  content: string;
  setContent: (content: string) => void;
};

export const usePageStore = create<PageState>((set) => ({
  content: '',
  setContent: (content) => set({ content }),
}));