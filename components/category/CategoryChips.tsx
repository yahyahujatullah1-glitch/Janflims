'use client';

import React from 'react';
import Link from 'next/link';
import type { Category } from '@/types/category';

interface CategoryChipsProps {
  categories: Category[];
}

export function CategoryChips({ categories }: CategoryChipsProps) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: '20px var(--page-px) 0' }}>
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/category/${c.slug}`}
          style={{
            background:   'var(--color-bg-surface-2)',
            border:       '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            fontSize:     12,
            fontWeight:   600,
            padding:      '5px 16px',
            color:        'var(--color-text-2)',
            transition:   'all var(--t-fast)',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background    = 'var(--color-accent)';
            (e.currentTarget as HTMLElement).style.color         = 'var(--color-text-inverse)';
            (e.currentTarget as HTMLElement).style.borderColor   = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background    = 'var(--color-bg-surface-2)';
            (e.currentTarget as HTMLElement).style.color         = 'var(--color-text-2)';
            (e.currentTarget as HTMLElement).style.borderColor   = 'var(--color-border)';
          }}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
