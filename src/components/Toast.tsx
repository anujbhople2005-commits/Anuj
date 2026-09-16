import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div
      id="toast"
      className="fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-semibold z-50 transition-all duration-300 transform translate-y-0 opacity-100 max-w-md border border-slate-700"
      role="status"
      aria-live="polite"
    >
      {toast.type === 'alert' ? (
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
      ) : toast.type === 'info' ? (
        <Info className="w-4 h-4 text-blue-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      )}
      <span className="leading-snug">{toast.message}</span>
    </div>
  );
};
