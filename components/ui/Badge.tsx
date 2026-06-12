import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'default' | 'accent' | 'success' | 'danger' | 'warning';

interface BadgeProps {
  variant?:  BadgeVariant;
  children:  React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-bg-surface-2)] text-[var(--color-text-2)] border border-[var(--color-border)]',
  accent:  'bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-accent-border)]',
  success: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border border-[rgba(82,201,122,0.25)]',
  danger:  'bg-[var(--color-danger-dim)] text-[var(--color-danger)] border border-[rgba(224,82,82,0.25)]',
  warning: 'bg-[rgba(245,166,35,0.12)] text-[var(--color-warning)] border border-[rgba(245,166,35,0.25)]',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-[9px] py-[2px] rounded-[var(--radius-xs)] text-[10px] font-bold uppercase tracking-[0.07em]',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
