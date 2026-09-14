import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast.message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounceIn">
      <div className="px-6 py-3 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white text-sm font-bold shadow-2xl border border-orange-500/50 flex items-center gap-3 backdrop-blur-md">
        <span className="text-orange-400 text-lg">🔔</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
