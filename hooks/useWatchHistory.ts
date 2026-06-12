'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Video } from '@/types/video';

interface HistoryEntry {
  video:           Video;
  progressSeconds: number;
  watchedAt:       string;
}

export function useWatchHistory() {
  const { data: session } = useSession();
  const [history, setHistory]   = useState<HistoryEntry[]>([]);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    setLoading(true);
    fetch('/api/watch')
      .then((r) => r.json())
      .then((json) => { setHistory(json.data ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [session]);

  const saveProgress = async (videoId: number, progressSeconds: number) => {
    if (!session?.user) return;
    await fetch('/api/watch', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ videoId, progressSeconds }),
    });
  };

  return { history, loading, saveProgress };
}
