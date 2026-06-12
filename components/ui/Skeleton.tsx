import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  variant?: 'card' | 'text' | 'circle';
  width?:   number | string;
  height?:  number | string;
  className?: string;
}

export function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  const base = 'bg-[var(--color-bg-surface-2)] animate-[shimmer_1.5s_ease_infinite]';

  if (variant === 'card') {
    return (
      <div
        className={clsx(base, 'rounded-[var(--radius-md)] overflow-hidden', className)}
        style={{ width: width ?? 210, flexShrink: 0 }}
      >
        <div className="h-[118px] bg-[var(--color-bg-surface-3)]" />
        <div className="p-[10px_12px_14px] flex flex-col gap-2">
          <div className="h-3 bg-[var(--color-bg-surface-3)] rounded w-full" />
          <div className="h-2.5 bg-[var(--color-bg-surface-3)] rounded w-[60%]" />
        </div>
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div
        className={clsx(base, 'rounded-full', className)}
        style={{ width: width ?? 36, height: height ?? 36 }}
      />
    );
  }

  return (
    <div
      className={clsx(base, 'rounded', className)}
      style={{ width: width ?? '100%', height: height ?? 14 }}
    />
  );
}

export function SkeletonRow() {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4 px-[var(--page-px)]">
        <Skeleton width={160} height={22} className="rounded" />
      </div>
      <div className="flex gap-[14px] overflow-hidden px-[var(--page-px)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="card" />
        ))}
      </div>
    </section>
  );
}
