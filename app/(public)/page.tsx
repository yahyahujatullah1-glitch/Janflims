import React from 'react';
import { supabase } from '@/lib/db';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { HomeContent } from '@/components/home/HomeContent';

async function getFeaturedVideos() {
  const { data } = await (supabase.from('videos') as any)
    .select('*')
    .eq('is_featured', true)
    .order('views', { ascending: false })
    .limit(5);

  return (data as any[]).map((v) => ({
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
  }));
}

async function getCategories() {
  const { data } = await (supabase.from('categories') as any)
    .select('*')
    .order('name', { ascending: true });
  return (data as any[]) ?? [];
}

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedVideos(),
    getCategories(),
  ]);

  return (
    <>
      <HeroSlider videos={featured as any} />
      <HomeContent initialCategories={categories} />
    </>
  );
}
