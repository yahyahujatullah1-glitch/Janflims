'use client';

import React, { useState } from 'react';
import { Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { VideoGrid } from '@/components/video/VideoGrid';
import { useVideos } from '@/hooks/useVideos';
import { useUIStore } from '@/store/uiStore';

export default function MoviesPage() {
  const [sort, setSort] = useState<'views' | 'imdb' | 'year'>('views');
  const { data, loading } = useVideos({ type: 'movie', sort });
  const { setActiveVideo } = useUIStore();

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '40px var(--page-px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <h1 className="font-display anim-slideLeft" style={{ fontSize: 'var(--text-3xl)' }}>Movies</h1>
          {!loading && <Badge variant="accent">{data.length} titles</Badge>}
          <div style={{ flex: 1 }} />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            inputSize="sm"
            style={{ width: 170 }}
          >
            <option value="views">Most Watched</option>
            <option value="imdb">Top Rated</option>
            <option value="year">Newest First</option>
          </Select>
        </div>
        <VideoGrid videos={data} loading={loading} onSelect={setActiveVideo} />
      </div>
    </div>
  );
}
