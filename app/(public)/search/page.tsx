'use client';

import React from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { CategoryChips } from '@/components/category/CategoryChips';
import { useSearch } from '@/hooks/useSearch';
import { useCategories } from '@/hooks/useCategories';
import { useUIStore } from '@/store/uiStore';

export default function SearchPage() {
  const { query, setQuery, genre, setGenre, type, setType, year, setYear, results, loading, hasSearched, reset } = useSearch();
  const { categories } = useCategories();
  const { setActiveVideo } = useUIStore();

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '40px var(--page-px)' }}>
        <h1 className="font-display anim-slideLeft" style={{ fontSize: 'var(--text-3xl)', marginBottom: 28 }}>Search</h1>

        {/* Search bar + filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={reset}
            autoFocus
          />
          <SearchFilters
            genre={genre}     onGenre={setGenre}
            type={type}       onType={setType}
            year={year}       onYear={setYear}
            categories={categories}
          />
        </div>

        {/* Results or discover */}
        {hasSearched ? (
          <SearchResults
            results={results}
            loading={loading}
            hasSearched={hasSearched}
            onSelect={setActiveVideo}
          />
        ) : (
          <div style={{ paddingTop: 40 }}>
            <p style={{ color: 'var(--color-text-3)', fontSize: 14, marginBottom: 20 }}>Browse by genre</p>
            <CategoryChips categories={categories} />
          </div>
        )}
      </div>
    </div>
  );
}
