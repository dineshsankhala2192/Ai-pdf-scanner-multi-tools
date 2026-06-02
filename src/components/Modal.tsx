import React, { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className="bg-nav border border-cyan-accent glow-shadow relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl flex flex-col"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-cyan-accent/30 bg-nav/95 backdrop-blur">
          <h2 className="text-xl font-bold text-cyan-accent glow-text">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-dim hover:text-cyan-accent hover:bg-btn transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
