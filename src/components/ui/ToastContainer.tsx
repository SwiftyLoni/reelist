import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { useToastList } from '../../hooks/useToast';
import './ToastContainer.css';

export function ToastContainer() {
  const { toasts, dismiss } = useToastList();

  return createPortal(
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>,
    document.body,
  );
}
