import React from 'react';

interface ProgressBarProps {
  value:    number; // 0–100
  height?:  number;
  color?:   string;
}

export function ProgressBar({ value, height = 3, color = 'var(--color-accent)' }: ProgressBarProps) {
  return (
    <div
      style={{
        width:        '100%',
        height,
        background:   'var(--color-bg-surface-3)',
        borderRadius: height,
        overflow:     'hidden',
      }}
    >
      <div
        style={{
          height:       '100%',
          width:        `${Math.min(100, Math.max(0, value))}%`,
          background:   color,
          borderRadius: height,
          transition:   'width 0.3s ease',
        }}
      />
    </div>
  );
}
