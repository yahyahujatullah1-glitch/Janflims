import React from 'react';
import { VideoCard } from './VideoCard';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Video } from '@/types/video';
import { Search } from 'lucide-react';

interface VideoGridProps {
  videos:    Video[];
  loading?:  boolean;
  onSelect:  (v: Video) => void;
  emptyText?: string;
}

export function VideoGrid({ videos, loading, onSelect, emptyText = 'No videos found' }: VideoGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
        {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} variant="card" />)}
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[var(--color-text-3)]">
        <Search size={52} strokeWidth={1.2} />
        <p className="mt-4 text-[16px]">{emptyText}</p>
        <p className="mt-1.5 text-[13px]">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
      {videos.map((v, i) => (
        <div key={v.id} className="anim-fadeUp" style={{ animationDelay: `${i * 0.03}s` }}>
          <VideoCard video={v} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
