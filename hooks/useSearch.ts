'use client';

import { useState, useEffect, useRef } from 'react';
import type { Video } from '@/types/video';

export function useSearch() {
  const [query,   setQuery]   = useState('');
  const [genre,   setGenre]   = useState('');
  const [type,    setType]    = useState('');
  const [year,    setYear]    = useState('');
  const [results, setResults] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const hasFilter = query || genre || type || year;
    if (!hasFilter) {
      setResults([]);
      setLoading(false);
      return;
    }

    setHasSearched(true);
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (genre) params.set('genre', genre);
      if (type)  params.set('type', type);
      if (year)  params.set('year', year);

      fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((json) => {
          setResults(json.data ?? []);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') setLoading(false);
        });
    }, 280);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, genre, type, year]);

  const reset = () => {
    setQuery(''); setGenre(''); setType(''); setYear('');
    setResults([]); setHasSearched(false);
  };

  return {
    query, setQuery,
    genre, setGenre,
    type,  setType,
    year,  setYear,
    results, loading, hasSearched,
    reset,
  };
}
