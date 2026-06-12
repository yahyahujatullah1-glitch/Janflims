import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET() {
  const { data: categories, error } = await (supabase.from('categories') as any)
    .select('*, video_categories(count)')
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error.message } }, { status: 500 });

  return NextResponse.json({ data: categories ?? [] });
}
