'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { VideoGrid } from '@/components/video/VideoGrid';
import { useVideos } from '@/hooks/useVideos';
import { useUIStore } from '@/store/uiStore';

export default function CategoryPage() {
  const params    = useParams();
  const slug      = params.slug as string;
  // Convert slug to genre name (e.g. "sci-fi" → "Sci-Fi")
  const genreName = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('-');

  const [sort, setSort] = useState<'views' | 'imdb' | 'year'>('views');
  const { data, loading } = useVideos({ genre: genreName, sort });
  const { setActiveVideo } = useUIStore();

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '40px var(--page-px)' }}>
        <CategoryHeader
          name={genreName}
          count={data.length}
          sort={sort}
          onSort={(s) => setSort(s as any)}
        />
        <VideoGrid videos={data} loading={loading} onSelect={setActiveVideo} />
      </div>
    </div>
  );
}
