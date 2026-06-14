import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { VideoUpdateSchema } from '@/lib/validators';

function serializeVideo(v: any) {
  return {
    ...v,
    streamUrl:    v.stream_url,
    trailerUrl:   v.trailer_url,
    thumbnailUrl: v.thumbnail_url,
    backdropUrl:  v.backdrop_url,
    releaseYear:  v.release_year,
    isFeatured:   v.is_featured,
    imdbScore:    v.imdb_score ? Number(v.imdb_score) : null,
    genre:        v.genre ? v.genre.split(',').map((g: string) => g.trim()) : [],
    createdAt:    v.created_at,
  };
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: { code: 'BAD_REQUEST', message: 'Invalid id' } }, { status: 400 });

  const { data: video, error } = await (supabase.from('videos') as any)
    .select('*')
    .eq('id', id)
    .single();

  if (error || !video) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Video not found' } }, { status: 404 });

  return NextResponse.json({ data: serializeVideo(video) });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Admin only' } }, { status: 401 });
  }

  const id     = Number(params.id);
  const body   = await req.json();
  const parsed = VideoUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: { code: 'VALIDATION', message: parsed.error.message } }, { status: 400 });
  }

  const {
    streamUrl, trailerUrl, thumbnailUrl, backdropUrl,
    imdbScore, isFeatured, releaseYear, cast,
    ...rest
  } = parsed.data as any;

  const updatePayload: Record<string, any> = { ...rest };
  if (streamUrl    !== undefined) updatePayload.stream_url    = streamUrl;
  if (trailerUrl   !== undefined) updatePayload.trailer_url   = trailerUrl;
  if (thumbnailUrl !== undefined) updatePayload.thumbnail_url = thumbnailUrl;
  if (backdropUrl  !== undefined) updatePayload.backdrop_url  = backdropUrl;
  if (imdbScore    !== undefined) updatePayload.imdb_score    = imdbScore;
  if (isFeatured   !== undefined) updatePayload.is_featured   = isFeatured;
  if (releaseYear  !== undefined) updatePayload.release_year  = releaseYear;
  if (cast         !== undefined) updatePayload['cast']       = cast;

  const { data: video, error } = await (supabase.from('videos') as any)
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error || !video) {
    return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error?.message ?? 'Update failed' } }, { status: 500 });
  }

  return NextResponse.json({ data: serializeVideo(video) });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Admin only' } }, { status: 401 });
  }

  const id = Number(params.id);
  const { error } = await (supabase.from('videos') as any).delete().eq('id', id);
  if (error) return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error.message } }, { status: 500 });

  return NextResponse.json({ data: null });
}
