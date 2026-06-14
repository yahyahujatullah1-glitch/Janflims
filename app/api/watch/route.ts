import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { WatchProgressSchema } from '@/lib/validators';

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ data: [] });
  const userId = Number((session.user as any).id);
  const { data: history } = await (supabase.from('watch_history') as any)
    .select('*, videos(*)')
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(20);
  const data = (history ?? []).map((h: any) => ({
    video: {
      ...h.videos,
      imdbScore: h.videos.imdb_score ? Number(h.videos.imdb_score) : null,
      genre: h.videos.genre ? h.videos.genre.split(',').map((g: string) => g.trim()) : [],
      createdAt: h.videos.created_at,
      thumbnailUrl: h.videos.thumbnail_url,
      backdropUrl: h.videos.backdrop_url,
      streamUrl: h.videos.stream_url,
      trailerUrl: h.videos.trailer_url,
      releaseYear: h.videos.release_year,
      isFeatured: h.videos.is_featured,
    },
    progressSeconds: h.progress_seconds,
    watchedAt: h.watched_at,
  }));
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ data: null });
  const body = await req.json();
  const parsed = WatchProgressSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: { code: 'VALIDATION', message: 'Invalid input' } }, { status: 400 });
  const userId = Number((session.user as any).id);
  const { videoId, progressSeconds } = parsed.data;
  await (supabase.from('watch_history') as any).upsert(
    { user_id: userId, video_id: videoId, progress_seconds: progressSeconds, watched_at: new Date().toISOString() },
    { onConflict: 'user_id,video_id' }
  );
  if (progressSeconds === 0) await supabase.rpc('increment_views', { video_id: videoId } as any);
  return NextResponse.json({ data: null });
}
