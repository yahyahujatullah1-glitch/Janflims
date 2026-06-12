import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  inputSize?:  'sm' | 'md';
}

const baseInput = 'w-full bg-[var(--color-bg-surface-2)] border border-[var(--color-border)] text-[var(--color-text-1)] rounded-[var(--radius-sm)] placeholder:text-[var(--color-text-3)] outline-none transition-colors focus:border-[var(--color-accent)] font-body';

export function Input({ label, error, inputSize = 'md', className, ...props }: InputProps) {
  const size = inputSize === 'sm' ? 'px-3 py-2 text-[13px]' : 'px-[14px] py-[11px] text-[14px]';
  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label className="text-[11px] font-bold text-[var(--color-text-3)] uppercase tracking-[0.06em]">
          {label}
        </label>
      )}
      <input className={clsx(baseInput, size, error && 'border-[var(--color-danger)]', className)} {...props} />
      {error && <p className="text-[11px] text-[var(--color-danger)]">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:     string;
  error?:     string;
  inputSize?: 'sm' | 'md';
}

export function Select({ label, error, inputSize = 'md', className, children, ...props }: SelectProps) {
  const size = inputSize === 'sm' ? 'px-3 py-2 text-[13px]' : 'px-[14px] py-[11px] text-[14px]';
  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label className="text-[11px] font-bold text-[var(--color-text-3)] uppercase tracking-[0.06em]">
          {label}
        </label>
      )}
      <select className={clsx(baseInput, size, 'cursor-pointer', error && 'border-[var(--color-danger)]', className)} {...props}>
        {children}
      </select>
      {error && <p className="text-[11px] text-[var(--color-danger)]">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label className="text-[11px] font-bold text-[var(--color-text-3)] uppercase tracking-[0.06em]">
          {label}
        </label>
      )}
      <textarea
        className={clsx(baseInput, 'px-[14px] py-[11px] text-[14px] resize-vertical min-h-[90px]', error && 'border-[var(--color-danger)]', className)}
        {...props}
      />
      {error && <p className="text-[11px] text-[var(--color-danger)]">{error}</p>}
    </div>
  );
}
