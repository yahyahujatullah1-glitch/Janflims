import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { VideoCreateSchema } from '@/lib/validators';

function serializeVideo(v: any) {
  return {
    ...v,
    genre:     v.genre ? v.genre.split(',').map((g: string) => g.trim()) : [],
    createdAt: v.created_at,
  };
}

// GET /api/videos
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genre    = searchParams.get('genre');
  const type     = searchParams.get('type');
  const sort     = searchParams.get('sort') ?? 'views';
  const limit    = Number(searchParams.get('limit')) || undefined;
  const featured = searchParams.get('featured');

  let query = supabase.from('videos').select('*');

  if (genre)    query = query.ilike('genre', `%${genre}%`);
  if (type)     query = query.eq('type', type as any);
  if (featured) query = query.eq('is_featured', featured === 'true');

  const orderCol =
    sort === 'imdb' ? 'imdb_score' :
    sort === 'year' ? 'release_year' :
    'views';
  query = query.order(orderCol, { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error.message } }, { status: 500 });

  return NextResponse.json({ data: (data ?? []).map(serializeVideo) });
}

// POST /api/videos — admin only
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Admin only' } }, { status: 401 });
  }

  const body   = await req.json();
  const parsed = VideoCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: { code: 'VALIDATION', message: parsed.error.message } }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from('videos')
    .select('id')
    .eq('slug', parsed.data.slug)
    .single();

  if (existing) {
    return NextResponse.json({ error: { code: 'CONFLICT', message: 'Slug already exists' } }, { status: 409 });
  }

  const { imdbScore, trailerUrl, backdropUrl, isFeatured, releaseYear, streamUrl, thumbnailUrl, cast, ...rest } = parsed.data as any;

  const { data: video, error } = await supabase
    .from('videos')
    .insert({
      ...rest,
      stream_url:    streamUrl    ?? null,
      trailer_url:   trailerUrl   ?? null,
      thumbnail_url: thumbnailUrl ?? null,
      backdrop_url:  backdropUrl  ?? null,
      imdb_score:    imdbScore    ?? null,
      is_featured:   isFeatured   ?? false,
      release_year:  releaseYear,
      'cast':        cast         ?? null,
    } as any)
    .select()
    .single();

  if (error || !video) {
    return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error?.message ?? 'Insert failed' } }, { status: 500 });
  }

  return NextResponse.json({ data: serializeVideo(video) }, { status: 201 });
}
