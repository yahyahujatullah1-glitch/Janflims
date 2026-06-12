'use client';

import React, { useEffect, useRef } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { VideoMeta } from '@/components/video/VideoMeta';
import { RelatedVideos } from '@/components/video/RelatedVideos';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import type { Video } from '@/types/video';

interface WatchPageClientProps {
  video: Video;
}

export function WatchPageClient({ video }: WatchPageClientProps) {
  const { toggleWatchlist, isInWatchlist } = useAuthStore();
  const { setActiveVideo } = useUIStore();
  const { saveProgress } = useWatchHistory();
  const inList     = isInWatchlist(video.id);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  // Record initial view
  useEffect(() => {
    saveProgress(video.id, 0);

    // Save progress every 10 seconds
    intervalRef.current = setInterval(() => {
      progressRef.current += 10;
      saveProgress(video.id, progressRef.current);
    }, 10_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current > 0) saveProgress(video.id, progressRef.current);
    };
  }, [video.id]);

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh' }}>
      {/* Player */}
      <div style={{ position: 'relative', paddingBottom: '50%', background: '#000', maxHeight: '75vh' }}>
        <VideoPlayer video={video} />
      </div>

      {/* Below player */}
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '32px var(--page-px)', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
        {/* Left: meta */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <VideoMeta video={video} />
            </div>
            <Button
              variant={inList ? 'outline' : 'ghost'}
              size="sm"
              icon={inList ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
              onClick={() => toggleWatchlist(video)}
            >
              {inList ? 'Saved' : 'Watchlist'}
            </Button>
          </div>

          {/* Genre chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {video.genre.map((g) => (
              <span
                key={g}
                style={{
                  background: 'var(--color-bg-surface-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 12, fontWeight: 500,
                  padding: '4px 14px',
                  color: 'var(--color-text-2)',
                }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Right: related */}
        <div>
          <RelatedVideos videoId={video.id} onSelect={(v) => setActiveVideo(v)} />
        </div>
      </div>
    </div>
  );
}
