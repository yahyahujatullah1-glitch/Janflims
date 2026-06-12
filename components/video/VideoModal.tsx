'use client';

import React, { useEffect } from 'react';
import { X, Bookmark, BookmarkCheck } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { VideoPlayer } from './VideoPlayer';
import { VideoMeta } from './VideoMeta';
import { RelatedVideos } from './RelatedVideos';
import { useAuthStore } from '@/store/authStore';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import type { Video } from '@/types/video';

interface VideoModalProps {
  video:    Video;
  onClose:  () => void;
  onSelect: (v: Video) => void;
}

export function VideoModal({ video, onClose, onSelect }: VideoModalProps) {
  const { toggleWatchlist, isInWatchlist } = useAuthStore();
  const { saveProgress } = useWatchHistory();
  const inList = isInWatchlist(video.id);

  // Record a view on open
  useEffect(() => {
    saveProgress(video.id, 0);
  }, [video.id]);

  // Save progress on unmount
  useEffect(() => {
    return () => { saveProgress(video.id, 30); };
  }, [video.id]);

  const handleRelatedSelect = (v: Video) => {
    onSelect(v);
  };

  return (
    <Modal open onClose={onClose} maxWidth={900}>
      {/* Player */}
      <div style={{ position: 'relative', paddingBottom: '42%', background: '#000', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', overflow: 'hidden' }}>
        <VideoPlayer video={video} />
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)', border: 'none',
            color: 'var(--color-text-1)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'background var(--t-fast)',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '24px 28px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <VideoMeta video={video} />
          </div>
          <Button
            variant={inList ? 'accent' : 'ghost'}
            size="sm"
            icon={inList ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            onClick={() => toggleWatchlist(video)}
          >
            {inList ? 'Saved' : 'Watchlist'}
          </Button>
        </div>

        {/* Genre chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
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
                cursor: 'pointer',
                transition: 'all var(--t-fast)',
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Related */}
      <div style={{ padding: '0 28px 28px' }}>
        <RelatedVideos videoId={video.id} onSelect={handleRelatedSelect} />
      </div>
    </Modal>
  );
}
