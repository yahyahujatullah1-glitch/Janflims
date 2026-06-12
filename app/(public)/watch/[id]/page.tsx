import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/db';
import { WatchPageClient } from '@/components/watch/WatchPageClient';

async function getVideo(id: number) {
  const { data: v } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (!v) return null;
  return {
    ...v,
    imdbScore:    v.imdb_score ? Number(v.imdb_score) : null,
    genre:        v.genre ? v.genre.split(',').map((g: string) => g.trim()) : [],
    createdAt:    v.created_at,
    thumbnailUrl: v.thumbnail_url,
    backdropUrl:  v.backdrop_url,
    streamUrl:    v.stream_url,
    trailerUrl:   v.trailer_url,
    releaseYear:  v.release_year,
    isFeatured:   v.is_featured,
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const video = await getVideo(Number(params.id));
  if (!video) return { title: 'Not Found — JanFlims' };
  return {
    title:       `${video.title} (${video.releaseYear}) — JanFlims`,
    description: video.description.slice(0, 160),
    openGraph: {
      title:       video.title,
      description: video.description,
      images:      [{ url: video.thumbnailUrl, width: 1200, height: 630 }],
      type:        'video.movie',
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context':  'https://schema.org',
        '@type':     video.type === 'movie' ? 'Movie' : 'TVSeries',
        name:         video.title,
        description:  video.description,
        image:        video.thumbnailUrl,
        dateCreated:  String(video.releaseYear),
      }),
    },
  };
}

export default async function WatchPage({ params }: { params: { id: string } }) {
  const video = await getVideo(Number(params.id));
  if (!video) notFound();

  return <WatchPageClient video={video as any} />;
}
