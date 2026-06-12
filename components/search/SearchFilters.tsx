import React from 'react';
import { Select } from '@/components/ui/Input';
import type { Category } from '@/types/category';

interface SearchFiltersProps {
  genre:       string;
  onGenre:     (v: string) => void;
  type:        string;
  onType:      (v: string) => void;
  year:        string;
  onYear:      (v: string) => void;
  categories:  Category[];
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));

export function SearchFilters({ genre, onGenre, type, onType, year, onYear, categories }: SearchFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Select
        value={genre}
        onChange={(e) => onGenre(e.target.value)}
        inputSize="md"
        style={{ flex: '0 1 160px' }}
      >
        <option value="">All Genres</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </Select>

      <Select
        value={type}
        onChange={(e) => onType(e.target.value)}
        inputSize="md"
        style={{ flex: '0 1 140px' }}
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </Select>

      <Select
        value={year}
        onChange={(e) => onYear(e.target.value)}
        inputSize="md"
        style={{ flex: '0 1 130px' }}
      >
        <option value="">Any Year</option>
        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
      </Select>
    </div>
  );
}
