'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value:     string;
  onChange:  (v: string) => void;
  onClear?:  () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, onClear, placeholder = 'Search titles, genres, languages…', autoFocus }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', flex: '1 1 300px' }}>
      <Search
        size={16}
        style={{
          position: 'absolute', left: 14, top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-text-3)',
          pointerEvents: 'none',
        }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          width:        '100%',
          background:   'var(--color-bg-surface)',
          border:       '1px solid var(--color-border)',
          color:        'var(--color-text-1)',
          borderRadius: 'var(--radius-sm)',
          fontFamily:   'var(--font-body)',
          fontSize:     15,
          outline:      'none',
          padding:      '12px 40px 12px 44px',
          transition:   'border-color var(--t-base)',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent)'; }}
        onBlur={(e)  => { e.target.style.borderColor = 'var(--color-border)'; }}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)',
            background: 'none', border: 'none',
            color: 'var(--color-text-3)', cursor: 'pointer',
            display: 'flex',
          }}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
