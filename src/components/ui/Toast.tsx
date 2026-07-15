import { useEffect } from 'react';
import { Icon } from './Icon';
import type { ToastMessage } from '../../hooks/useToast';
import './Toast.css';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const ICON_BY_VARIANT = {
  success: 'check-circle',
  error: 'alert-triangle',
  info: 'check-circle',
} as const;

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={`toast toast--${toast.variant}`} role="status">
      <Icon name={ICON_BY_VARIANT[toast.variant]} size={18} />
      <span>{toast.message}</span>
      <button
        className="toast__close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}
