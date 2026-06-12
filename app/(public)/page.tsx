import React from 'react';
import { prisma } from '@/lib/db';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { HomeContent } from '@/components/home/HomeContent';

// Fetch featured videos server-side for hero slider (fast initial paint)
async function getFeaturedVideos() {
  const videos = await prisma.video.findMany({
    where:   { isFeatured: true },
    orderBy: { views: 'desc' },
    take:    5,
  });
  return videos.map((v) => ({
    ...v,
    imdbScore: v.imdbScore ? Number(v.imdbScore) : null,
    genre:     v.genre.split(',').map((g) => g.trim()),
    createdAt: v.createdAt.toISOString(),
  }));
}

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
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
