import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fmt } from '@/lib/format';
import type { User } from '@/types/user';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontWeight: 700, fontSize: 13 }}>All Users</p>
        <p style={{ color: 'var(--color-text-3)', fontSize: 12 }}>{users.length} total</p>
      </div>

      {users.map((u, i) => (
        <div
          key={u.id}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 20px',
            borderBottom: i < users.length - 1 ? '1px solid var(--color-border)' : 'none',
            transition: 'background var(--t-fast)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-surface-2)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <Avatar name={u.name} size={38} src={u.avatarUrl} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: 13 }}>{u.name}</p>
            <p style={{ color: 'var(--color-text-3)', fontSize: 11 }}>{u.email}</p>
          </div>
          <Badge variant={u.role === 'admin' ? 'accent' : 'default'}>{u.role}</Badge>
          <span style={{ color: 'var(--color-text-3)', fontSize: 12 }}>
            Joined {fmt.date(u.createdAt)}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button variant="subtle" size="sm">View</Button>
            {u.role !== 'admin' && <Button variant="danger" size="sm">Remove</Button>}
          </div>
        </div>
      ))}
    </div>
  );
}
