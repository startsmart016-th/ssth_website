import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length === 0) return;
    const latestToast = toasts[toasts.length - 1];
    const timer = setTimeout(() => {
      onDismiss(latestToast.id);
    }, 4500);

    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border text-sm font-medium animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'info'
              ? 'bg-[#073B87] text-white border-blue-400/40 shadow-blue-900/30'
              : 'bg-[#062B68] text-white border-[#10BFAE]/40 shadow-teal-900/30'
          }`}
        >
          {toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#16D9C5] shrink-0 mt-0.5" />
          )}

          <p className="flex-1 leading-snug">{toast.message}</p>

          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-slate-300 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
