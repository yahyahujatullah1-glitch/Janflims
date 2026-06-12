import React from 'react';
import { supabase } from '@/lib/db';
import { UserTable } from '@/components/admin/UserTable';

async function getUsers() {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, email, role, avatar_url, created_at')
    .order('created_at', { ascending: false });

  if (error || !users) return [];

  return users.map(u => ({
    id:        u.id,
    name:      u.name,
    email:     u.email,
    role:      u.role,
    avatarUrl: u.avatar_url,
    createdAt: u.created_at,
  }));
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Users</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>
          {users.length} registered users
        </p>
      </div>
      <UserTable users={users as any} />
    </div>
  );
}
