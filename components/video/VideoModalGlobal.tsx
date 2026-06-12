'use client';

import React from 'react';
import { VideoModal } from './VideoModal';
import { useUIStore } from '@/store/uiStore';

export function VideoModalGlobal() {
  const { activeVideo, setActiveVideo } = useUIStore();

  if (!activeVideo) return null;

  return (
    <VideoModal
      video={activeVideo}
      onClose={() => setActiveVideo(null)}
      onSelect={(v) => setActiveVideo(v)}
    />
  );
}
