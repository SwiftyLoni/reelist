import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../types/user';

interface UIState {
  theme: Theme;
  toggleTheme: () => void;
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      activeModal: null,
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),
    }),
    {
      name: 'reelist-ui-store',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
