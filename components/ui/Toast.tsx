'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  const borderColors = {
    success: 'border-l-[#1e8a52]',
    error: 'border-l-[#c8401a]',
    info: 'border-l-[#1a6bc8]'
  };

  return (
    <div
      className={`fixed bottom-[28px] right-[28px] bg-[#0d0d0d] text-white px-[20px] py-[13px] rounded-[6px] text-[13.5px] shadow-[0_8px_32px_rgba(13,13,13,0.14)] flex items-center gap-[10px] max-w-[320px] z-[999] border-l-4 transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-[80px] opacity-0'
      } ${borderColors[type]}`}
    >
      <span className="text-[16px]">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}
