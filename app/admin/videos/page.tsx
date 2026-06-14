import React from 'react';
import { supabase } from '@/lib/db';
import { VideoForm } from '@/components/admin/VideoForm';
import { VideoTable } from '@/components/admin/VideoTable';

async function getVideos() {
  const { data, error } = await (supabase.from('videos') as any)
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return (data as any[]).map((v) => ({
    ...v,
    imdbScore:    v.imdb_score ? Number(v.imdb_score) : null,
    genre:        v.genre ? v.genre.split(',').map((g: string) => g.trim()) : [],
    createdAt:    v.created_at,
    thumbnailUrl: v.thumbnail_url,
    releaseYear:  v.release_year,
    isFeatured:   v.is_featured,
    streamUrl:    v.stream_url,
    trailerUrl:   v.trailer_url,
  }));
}

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Manage Videos</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>
          {videos.length} videos in your library
        </p>
      </div>
      <VideoForm />
      <VideoTable videos={videos as any} onMutate={() => {}} />
    </div>
  );
}
