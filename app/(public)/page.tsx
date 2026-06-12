import React from 'react';
import { supabase } from '@/lib/db';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { HomeContent } from '@/components/home/HomeContent';

async function getFeaturedVideos() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('is_featured', true)
    .order('views', { ascending: false })
    .limit(5);

  return (videos ?? []).map((v) => ({
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
    imdbRating:   v.imdb_score,
  }));
}

async function getCategories() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });
  return categories ?? [];
}

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedVideos(),
    getCategories(),
  ]);

  return (
    <>
      <HeroSlider videos={featured as any} onPlay={() => {}} />
      <HomeContent initialCategories={categories} />
    </>
  );
}
