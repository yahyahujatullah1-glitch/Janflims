import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(_req: NextRequest) {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, role, avatar_url, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = (data as any[]).map((u) => ({
    id:        u.id,
    name:      u.name,
    email:     u.email,
    role:      u.role,
    avatarUrl: u.avatar_url,
    createdAt: u.created_at,
  }));

  return NextResponse.json({ data: users });
}
