import React from 'react';
import { VideoGrid } from '@/components/video/VideoGrid';
import { Spinner } from '@/components/ui/Spinner';
import type { Video } from '@/types/video';

interface SearchResultsProps {
  results:      Video[];
  loading:      boolean;
  hasSearched:  boolean;
  onSelect:     (v: Video) => void;
}

export function SearchResults({ results, loading, hasSearched, onSelect }: SearchResultsProps) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <Spinner size={36} />
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  return (
    <div>
      <p style={{ color: 'var(--color-text-3)', fontSize: 13, marginBottom: 24 }}>
        {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      <VideoGrid videos={results} onSelect={onSelect} emptyText="No results found" />
    </div>
  );
}
