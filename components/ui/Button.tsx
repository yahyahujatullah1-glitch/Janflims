import React from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';

type Variant = 'primary' | 'ghost' | 'outline' | 'danger' | 'subtle';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?:     Variant;
  size?:        Size;
  icon?:        React.ReactNode;
  iconPosition?:'left' | 'right';
  loading?:     boolean;
  disabled?:    boolean;
  fullWidth?:   boolean;
  onClick?:     () => void;
  type?:        'button' | 'submit' | 'reset';
  children?:    React.ReactNode;
  className?:   string;
  style?:       React.CSSProperties;
}

const base = 'inline-flex items-center justify-center gap-[7px] rounded-[var(--radius-sm)] font-semibold border-none cursor-pointer transition-all select-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-hover)] active:scale-[0.97]',
  ghost:   'bg-white/[0.08] text-[var(--color-text-1)] border border-white/[0.13] hover:bg-white/[0.14] backdrop-blur-sm',
  outline: 'bg-transparent text-[var(--color-accent)] border border-[var(--color-accent-border)] hover:bg-[var(--color-accent-dim)]',
  danger:  'bg-[var(--color-danger-dim)] text-[var(--color-danger)] border border-[rgba(224,82,82,0.3)] hover:bg-[rgba(224,82,82,0.2)]',
  subtle:  'bg-[var(--color-bg-surface-2)] text-[var(--color-text-2)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-1)]',
};

const sizes: Record<Size, string> = {
  sm: 'text-[12px] px-[14px] py-[7px]',
  md: 'text-[14px] px-[20px] py-[10px]',
  lg: 'text-[15px] px-[28px] py-[13px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading,
  disabled,
  fullWidth,
  onClick,
  type = 'button',
  children,
  className,
  style,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {loading ? (
        <Spinner size={size === 'sm' ? 13 : size === 'md' ? 14 : 16} />
      ) : (
        iconPosition === 'left' && icon
      )}
      {children}
      {!loading && iconPosition === 'right' && icon}
    </button>
  );
}
