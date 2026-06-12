'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { VideoGrid } from '@/components/video/VideoGrid';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

export default function WatchlistPage() {
  const { watchlist }     = useAuthStore();
  const { setActiveVideo } = useUIStore();

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '40px var(--page-px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <h1 className="font-display anim-slideLeft" style={{ fontSize: 'var(--text-3xl)' }}>My Watchlist</h1>
        </div>

        {watchlist.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: 'var(--color-text-3)' }}>
            <Bookmark size={52} strokeWidth={1.2} />
            <p style={{ marginTop: 16, fontSize: 16 }}>Nothing saved yet</p>
            <p style={{ marginTop: 6, fontSize: 13 }}>Browse movies and series and click Watchlist to save them here</p>
          </div>
        ) : (
          <VideoGrid videos={watchlist} onSelect={setActiveVideo} />
        )}
      </div>
    </div>
  );
}
