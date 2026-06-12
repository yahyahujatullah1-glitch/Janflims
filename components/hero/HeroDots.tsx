import React from 'react';

interface HeroDotsProps {
  count:    number;
  active:   number;
  onChange: (i: number) => void;
}

export function HeroDots({ count, active, onChange }: HeroDotsProps) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{
            width:        i === active ? 28 : 8,
            height:       4,
            borderRadius: 2,
            padding:      0,
            border:       'none',
            cursor:       'pointer',
            background:   i === active ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)',
            transition:   'all 0.35s ease',
          }}
        />
      ))}
    </div>
  );
}
