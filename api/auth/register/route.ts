import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/lib/validators';
import type { Database } from '@/lib/database.types';

type UserInsert = Database['public']['Tables']['users']['Insert'];

export async function POST(req: NextRequest) {
  const body   = await req.json();
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: { code: 'VALIDATION', message: parsed.error.message } }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return NextResponse.json({ error: { code: 'CONFLICT', message: 'Email already registered' } }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);

  const payload: UserInsert = { name, email, password: hashed, role: 'user' };

  const { data: user, error } = await supabase
    .from('users')
    .insert(payload)
    .select('id, name, email, role')
    .single();

  if (error || !user) {
    return NextResponse.json({ error: { code: 'SERVER_ERROR', message: 'Registration failed' } }, { status: 500 });
  }

  return NextResponse.json({ data: user }, { status: 201 });
}
