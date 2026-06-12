'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  open:      boolean;
  onClose:   () => void;
  children:  React.ReactNode;
  maxWidth?: number;
}

export function Modal({ open, onClose, children, maxWidth = 900 }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="anim-fadeIn fixed inset-0 z-[200] flex items-center justify-center p-5"
      style={{ background: 'var(--color-bg-overlay)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <div
        className="anim-scaleIn w-full overflow-y-auto"
        style={{
          maxWidth,
          maxHeight: '90vh',
          background: 'var(--color-bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
