import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Admin only' } }, { status: 401 });
  }

  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, email, role, avatar_url, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: { code: 'SERVER_ERROR', message: error.message } }, { status: 500 });

  return NextResponse.json({
    data: (users ?? []).map((u) => ({ ...u, createdAt: u.created_at })),
  });
}
