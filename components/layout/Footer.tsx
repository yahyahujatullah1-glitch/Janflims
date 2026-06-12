import React from 'react';
import Link from 'next/link';

const COLS = [
  { title: 'Browse',  links: [{ label:'Home',          href:'/' },{ label:'Movies',     href:'/movies' },{ label:'Series',     href:'/series' },{ label:'Search',     href:'/search' }] },
  { title: 'Account', links: [{ label:'Sign In',       href:'/login' },{ label:'Create Account',href:'/register' },{ label:'Watchlist',    href:'/watchlist' }] },
  { title: 'Admin',   links: [{ label:'Dashboard',     href:'/admin' },{ label:'Add Video',     href:'/admin/videos/new' },{ label:'Manage Users',  href:'/admin/users' }] },
];

export function Footer() {
  return (
    <footer
      style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}
      className="mt-20 px-[var(--page-px)] py-16"
    >
      <div className="max-w-[var(--max-content)] mx-auto">
        <div className="flex flex-wrap justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4">
              <span className="font-display text-[30px] text-[var(--color-accent)]">JAN</span>
              <span className="font-display text-[30px] text-[var(--color-text-1)]">FLIMS</span>
            </div>
            <p className="text-[13px] text-[var(--color-text-2)] leading-[1.7]">
              A self-hosted, Netflix-style streaming platform. Paste your stream links, curate your library,
              and deliver a cinematic experience to every viewer.
            </p>
          </div>

          {/* Columns */}
          <div className="flex flex-wrap gap-16">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold text-[var(--color-text-3)] uppercase tracking-[0.1em] mb-4">{col.title}</p>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block text-[13px] text-[var(--color-text-2)] mb-2.5 hover:text-[var(--color-accent)] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-wrap justify-between items-center gap-3 pt-6"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-[12px] text-[var(--color-text-3)]">© 2024 JanFlims. All rights reserved.</p>
          <p className="text-[12px] text-[var(--color-text-3)]">Built on Next.js 14 · Tailwind · MySQL · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
