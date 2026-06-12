import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/recommendations';

function serializeVideo(v: any) {
  return {
    ...v,
    imdbScore: v.imdbScore ? Number(v.imdbScore) : null,
    genre:     v.genre.split(',').map((g: string) => g.trim()),
    createdAt: v.createdAt.toISOString(),
  };
}

export async function GET(req: NextRequest) {
  const videoId = Number(new URL(req.url).searchParams.get('videoId'));
  if (!videoId || isNaN(videoId)) return NextResponse.json({ data: [] });

  const results = await getRecommendations(videoId);
  return NextResponse.json({ data: results.map(serializeVideo) });
}
