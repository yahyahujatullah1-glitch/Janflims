import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fmt } from '@/lib/format';

export async function GET() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Admin only' } }, { status: 401 });
  }

  const [
    { count: videoCount },
    { count: userCount },
    { data: viewsData },
    { data: imdbData },
  ] = await Promise.all([
    supabase.from('videos').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    (supabase.from('videos') as any).select('views'),
    (supabase.from('videos') as any).select('imdb_score').not('imdb_score', 'is', null),
  ]);

  const totalViews = (viewsData ?? []).reduce((sum: number, v: any) => sum + (v.views ?? 0), 0);
  const avgImdb = imdbData && imdbData.length > 0
    ? (imdbData.reduce((sum: number, v: any) => sum + Number(v.imdb_score), 0) / imdbData.length).toFixed(1)
    : '—';

  return NextResponse.json({
    data: {
      totalVideos: videoCount ?? 0,
      totalViews:  fmt.views(totalViews),
      avgImdb,
      totalUsers:  userCount ?? 0,
    },
  });
}
