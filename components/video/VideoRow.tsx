'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import type { Video } from '@/types/video';

interface VideoRowProps {
  title:         string;
  icon?:         string;
  videos:        Video[];
  loading?:      boolean;
  onSelect:      (v: Video) => void;
  showProgress?: boolean;
}

export function VideoRow({ title, icon, videos, loading, onSelect, showProgress }: VideoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    rowRef.current?.scrollBy({ left: dir * 460, behavior: 'smooth' });
  };

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 px-[var(--page-px)]">
        {icon && <span className="text-lg">{icon}</span>}
        <h2 className="font-display text-[22px] text-[var(--color-text-1)] tracking-[0.06em]">{title}</h2>
        <div className="flex-1" />
        <div className="flex gap-1.5">
          <Button variant="subtle" size="sm" icon={<ChevronLeft size={14} />} onClick={() => scroll(-1)} />
          <Button variant="subtle" size="sm" icon={<ChevronRight size={14} />} onClick={() => scroll(1)} />
        </div>
      </div>

      {/* Row */}
      <div
        ref={rowRef}
        className="no-scrollbar flex gap-[14px] overflow-x-auto px-[var(--page-px)] pb-2 pt-1"
      >
        {loading
          ? Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} variant="card" />)
          : videos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                onSelect={onSelect}
                showProgress={showProgress}
              />
            ))}
      </div>
    </section>
  );
}
