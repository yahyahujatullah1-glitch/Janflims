import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

function serializeVideo(v: any) {
  return {
    ...v,
    genre:     v.genre ? v.genre.split(',').map((g: string) => g.trim()) : [],
    createdAt: v.created_at,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q     = searchParams.get('q')     ?? '';
  const genre = searchParams.get('genre') ?? '';
  const type  = searchParams.get('type')  ?? '';
  const year  = searchParams.get('year')  ?? '';

  let query = (supabase.from('videos') as any).select('*').order('views', { ascending: false }).limit(60);

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,description.ilike.%${q}%,genre.ilike.%${q}%,language.ilike.%${q}%,"cast".ilike.%${q}%`
    );
  }
  if (genre) query = query.ilike('genre', `%${genre}%`);
  if (type)  query = query.eq('type', type);
  if (year)  query = query.eq('release_year', Number(year));

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error.message } }, { status: 500 });

  return NextResponse.json({ data: (data ?? []).map(serializeVideo) });
}
