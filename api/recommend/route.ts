import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/recommendations';

export async function GET(req: NextRequest) {
  const videoId = Number(new URL(req.url).searchParams.get('videoId'));
  if (!videoId || isNaN(videoId)) return NextResponse.json({ data: [] });

  const results = await getRecommendations(videoId);
  return NextResponse.json({ data: results });
}
