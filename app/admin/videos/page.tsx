import React from 'react';
import { prisma } from '@/lib/db';
import { VideoForm } from '@/components/admin/VideoForm';
import { VideoTable } from '@/components/admin/VideoTable';

async function getVideos() {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: 'desc' } });
  return videos.map(v => ({
    ...v,
    imdbScore: v.imdbScore ? Number(v.imdbScore) : null,
    genre:     v.genre.split(',').map(g => g.trim()),
    createdAt: v.createdAt.toISOString(),
  }));
}

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Manage Videos</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>{videos.length} videos in your library</p>
      </div>
      <VideoForm />
      <VideoTable videos={videos as any} />
    </div>
  );
}
