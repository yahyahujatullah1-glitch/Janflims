import React from 'react';
import { prisma } from '@/lib/db';
import { UserTable } from '@/components/admin/UserTable';

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id:true, name:true, email:true, role:true, avatarUrl:true, createdAt:true },
  });
  return users.map(u => ({ ...u, createdAt: u.createdAt.toISOString() }));
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Users</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>{users.length} registered users</p>
      </div>
      <UserTable users={users as any} />
    </div>
  );
}
