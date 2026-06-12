import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Input';

interface CategoryHeaderProps {
  name:    string;
  count:   number;
  sort:    string;
  onSort:  (s: string) => void;
}

export function CategoryHeader({ name, count, sort, onSort }: CategoryHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
      <h1 className="font-display anim-slideLeft" style={{ fontSize: 'var(--text-3xl)' }}>
        {name}
      </h1>
      <Badge variant="accent">{count} titles</Badge>
      <div style={{ flex: 1 }} />
      <Select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        inputSize="sm"
        style={{ width: 170 }}
      >
        <option value="views">Most Watched</option>
        <option value="imdb">Top Rated</option>
        <option value="year">Newest First</option>
      </Select>
    </div>
  );
}
