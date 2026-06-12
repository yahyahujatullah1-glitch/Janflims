import { supabase } from '@/lib/db';

function serializeVideo(v: any) {
  return {
    ...v,
    genre:     v.genre ? v.genre.split(',').map((g: string) => g.trim()) : [],
    createdAt: v.created_at,
  };
}

export async function getRecommendations(videoId: number, limit = 8) {
  const { data: source } = await (supabase.from('videos') as any)
    .select('*')
    .eq('id', videoId)
    .single();

  if (!source) return [];

  const primaryGenre = source.genre ? source.genre.split(',')[0]?.trim() : '';

  const { data: byGenre } = await (supabase.from('videos') as any)
    .select('*')
    .neq('id', videoId)
    .ilike('genre', `%${primaryGenre}%`)
    .order('views', { ascending: false })
    .limit(limit);

  const results = byGenre ?? [];

  if (results.length < limit) {
    const excludedIds = [videoId, ...results.map((v: any) => v.id)];
    const { data: topViewed } = await (supabase.from('videos') as any)
      .select('*')
      .not('id', 'in', `(${excludedIds.join(',')})`)
      .order('views', { ascending: false })
      .limit(limit - results.length);

    return [...results, ...(topViewed ?? [])].map(serializeVideo);
  }

  return results.map(serializeVideo);
}
