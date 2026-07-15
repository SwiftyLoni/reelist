import { create } from 'zustand';

export interface ToastMessage {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'info';
}

interface ToastState {
  toasts: ToastMessage[];
  show: (message: string, variant?: ToastMessage['variant']) => void;
  dismiss: (id: string) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (message, variant = 'info') =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), message, variant }],
    })),
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function useToast() {
  const show = useToastStore((state) => state.show);
  return { show };
}

export function useToastList() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);
  return { toasts, dismiss };
}
