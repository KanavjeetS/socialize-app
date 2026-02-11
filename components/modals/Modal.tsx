import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'bottom-sheet' | 'dialog' | 'full';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, variant = 'dialog' }) => {
  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div 
        className={`
          relative bg-royal-900/90 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] w-full
          ${variant === 'bottom-sheet' ? 'mt-auto rounded-t-3xl border-b-0 animate-slide-up' : ''}
          ${variant === 'dialog' ? 'rounded-3xl max-w-sm animate-pulse-slow' : ''}
          ${variant === 'full' ? 'inset-0 h-full max-h-full rounded-none' : ''}
        `}
        style={{ animationDuration: '0.2s' }}
      >
        <div className="flex justify-between items-center p-5 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};