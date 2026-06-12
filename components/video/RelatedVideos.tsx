'use client';

import React from 'react';
import useSWR from 'swr';
import { VideoCard } from './VideoCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api';
import type { Video } from '@/types/video';

interface RelatedVideosProps {
  videoId:  number;
  onSelect: (v: Video) => void;
}

export function RelatedVideos({ videoId, onSelect }: RelatedVideosProps) {
  const { data, isLoading } = useSWR(
    ['recommend', videoId],
    () => api.recommend(videoId),
    { revalidateOnFocus: false }
  );

  const videos = data ?? [];

  return (
    <div>
      <h3
        className="font-display tracking-[0.08em] mb-4"
        style={{ fontSize: 17, color: 'var(--color-text-2)' }}
      >
        MORE LIKE THIS
      </h3>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="card" width={165} />)
          : videos.map((v) => (
              <VideoCard key={v.id} video={v} onSelect={onSelect} size="sm" />
            ))}
      </div>
    </div>
  );
}
