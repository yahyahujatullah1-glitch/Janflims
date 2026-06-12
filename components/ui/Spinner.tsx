import React from 'react';

interface SpinnerProps {
  size?:  number;
  color?: string;
}

export function Spinner({ size = 24, color = 'var(--color-accent)' }: SpinnerProps) {
  return (
    <div
      style={{
        width:          size,
        height:         size,
        border:         '2px solid rgba(255,255,255,0.1)',
        borderTopColor: color,
        borderRadius:   '50%',
        animation:      'spin 0.7s linear infinite',
        flexShrink:     0,
      }}
    />
  );
}
