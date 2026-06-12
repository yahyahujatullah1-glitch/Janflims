import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { WatchProgressSchema } from '@/lib/validators';

// GET /api/watch — fetch watch history for current user
export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ data: [] });

  const userId = Number((session.user as any).id);

  const { data: history } = await supabase
    .from('watch_history')
    .select('*, videos(*)')
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(20);

  const data = (history ?? []).map((h: any) => ({
    video: {
      ...h.videos,
      genre:     h.videos.genre.split(',').map((g: string) => g.trim()),
      createdAt: h.videos.created_at,
    },
    progressSeconds: h.progress_seconds,
    watchedAt:       h.watched_at,
  }));

  return NextResponse.json({ data });
}

// POST /api/watch — save watch progress
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ data: null });

  const body   = await req.json();
  const parsed = WatchProgressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: { code: 'VALIDATION', message: 'Invalid input' } }, { status: 400 });
  }

  const userId          = Number((session.user as any).id);
  const { videoId, progressSeconds } = parsed.data;

  // Upsert watch history
  await supabase.from('watch_history').upsert(
    { user_id: userId, video_id: videoId, progress_seconds: progressSeconds, watched_at: new Date().toISOString() },
    { onConflict: 'user_id,video_id' }
  );

  // Increment view count only on first play
  if (progressSeconds === 0) {
    await supabase.rpc('increment_views', { video_id: videoId });
  }

  return NextResponse.json({ data: null });
}
