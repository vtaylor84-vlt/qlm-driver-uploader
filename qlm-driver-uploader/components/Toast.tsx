// components/Toast.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  duration: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, onDismiss]);

  const bgColor = toast.type === 'success' ? 'bg-green-600' :
                  toast.type === 'error' ? 'bg-red-600' : 'bg-amber-600';

  return (
    <div className={`toast ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80 animate-slide-in`}>
      <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✗' : '⚠'}</span>
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="text-white/70 hover:text-white">✕</button>
    </div>
  );
};