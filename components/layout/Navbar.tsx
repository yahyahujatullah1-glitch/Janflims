'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Search, Bell, Menu, X, Shield, Bookmark, LogOut, ChevronDown } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';

const NAV_LINKS = [
  { href: '/',          label: 'Browse'  },
  { href: '/movies',    label: 'Movies'  },
  { href: '/series',    label: 'Series'  },
  { href: '/search',    label: 'Search'  },
];

export function Navbar() {
  const pathname             = usePathname();
  const { data: session }    = useSession();
  const { setAuthModal, toggleMobileMenu, mobileMenuOpen } = useUIStore();
  const [scrolled, setScrolled]   = useState(false);
  const [userMenu,  setUserMenu]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenu(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const user = session?.user as any;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        height:       'var(--navbar-height)',
        background:   scrolled ? 'rgba(6,9,13,0.97)' : 'linear-gradient(180deg,rgba(0,0,0,0.75) 0%,transparent 100%)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center h-full px-[var(--page-px)] gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 shrink-0">
          <span className="font-display text-[28px] text-[var(--color-accent)] tracking-[0.12em]">JAN</span>
          <span className="font-display text-[28px] text-[var(--color-text-1)] tracking-[0.12em]">FLIMS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                'px-3 py-1.5 rounded-[var(--radius-sm)] text-[14px] font-medium transition-all duration-150',
                pathname === l.href
                  ? 'bg-white/[0.08] text-[var(--color-text-1)] font-semibold'
                  : 'text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-white/[0.05]'
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="hidden md:flex p-2 rounded-[var(--radius-sm)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-white/[0.06] transition-all"
          >
            <Search size={18} />
          </Link>

          <button className="hidden md:flex p-2 rounded-[var(--radius-sm)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-white/[0.06] transition-all">
            <Bell size={18} />
          </button>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-hover)] transition-all"
              >
                <Avatar name={user.name ?? 'User'} size={28} src={user.image} />
                <span className="text-[13px] font-semibold text-[var(--color-text-1)] hidden sm:block">
                  {user.name?.split(' ')[0]}
                </span>
                <ChevronDown size={14} className="text-[var(--color-text-3)]" />
              </button>

              {userMenu && (
                <div
                  className="anim-slideDown absolute top-[calc(100%+8px)] right-0 min-w-[190px] rounded-[var(--radius-md)] overflow-hidden z-50"
                  style={{
                    background:  'var(--color-bg-surface)',
                    border:      '1px solid var(--color-border)',
                    boxShadow:   'var(--shadow-modal)',
                  }}
                >
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 text-[13px] text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors border-b border-[var(--color-border)]"
                      onClick={() => setUserMenu(false)}
                    >
                      <Shield size={14} /> Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/watchlist"
                    className="flex items-center gap-3 px-4 py-3 text-[13px] text-[var(--color-text-1)] hover:bg-white/[0.04] transition-colors"
                    onClick={() => setUserMenu(false)}
                  >
                    <Bookmark size={14} /> My Watchlist
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: '/' }); setUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[var(--color-text-2)] hover:bg-white/[0.04] transition-colors border-t border-[var(--color-border)]"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setAuthModal('login')}>Sign In</Button>
              <Button variant="primary" size="sm" onClick={() => setAuthModal('register')}>Join Free</Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="flex md:hidden p-2 text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 anim-slideDown"
          style={{
            background:  'var(--color-bg-surface)',
            borderTop:   '1px solid var(--color-border)',
            borderBottom:'1px solid var(--color-border)',
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-6 py-3 text-[14px] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] border-b border-[var(--color-border)]"
              onClick={() => useUIStore.getState().closeMobileMenu()}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-3 p-4">
              <Button variant="ghost"   size="sm" onClick={() => { setAuthModal('login');    useUIStore.getState().closeMobileMenu(); }}>Sign In</Button>
              <Button variant="primary" size="sm" onClick={() => { setAuthModal('register'); useUIStore.getState().closeMobileMenu(); }}>Join Free</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
