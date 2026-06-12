'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Film, Users, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';

const ITEMS = [
  { href: '/admin',         label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/videos',  label: 'Videos',    icon: Film },
  { href: '/admin/users',   label: 'Users',     icon: Users },
  { href: '/admin/settings',label: 'Settings',  icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col"
      style={{
        width:       'var(--sidebar-width)',
        background:  'var(--color-bg-surface)',
        borderRight: '1px solid var(--color-border)',
        flexShrink:  0,
        height:      '100%',
      }}
    >
      {/* Header */}
      <div className="px-5 py-6 border-b border-[var(--color-border)]">
        <p className="font-display text-[18px] text-[var(--color-accent)]">Admin Panel</p>
        <p className="text-[11px] text-[var(--color-text-3)] mt-0.5">JanFlims Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-5 py-3 text-[13px] font-medium transition-all border-l-[3px]',
                active
                  ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)] border-l-[var(--color-accent)]'
                  : 'text-[var(--color-text-2)] border-l-transparent hover:text-[var(--color-text-1)] hover:bg-white/[0.03]'
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-4 py-2.5 w-full rounded-[var(--radius-sm)] text-[13px] text-[var(--color-text-2)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-1)] transition-all mb-2"
        >
          ← Back to Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2.5 px-4 py-2.5 w-full rounded-[var(--radius-sm)] text-[13px] text-[var(--color-text-3)] hover:text-[var(--color-danger)] transition-colors"
        >
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
