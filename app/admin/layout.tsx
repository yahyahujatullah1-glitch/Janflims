import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export const metadata = { title: 'Admin — JanFlims' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    redirect('/login?reason=unauthorized');
  }

  return (
    <div style={{ display: 'flex', height: '100vh', paddingTop: 'var(--navbar-height)', background: 'var(--color-bg-base)' }}>
      {/* Fixed Navbar placeholder so sidebar sits below it */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--navbar-height)',
        background: 'rgba(6,9,13,0.97)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', padding: '0 48px',
      }}>
        <span className="font-display" style={{ fontSize: 26, color: 'var(--color-accent)' }}>JAN</span>
        <span className="font-display" style={{ fontSize: 26 }}>FLIMS</span>
        <span style={{ marginLeft: 16, fontSize: 12, color: 'var(--color-text-3)', background: 'var(--color-bg-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '2px 10px' }}>Admin</span>
      </div>

      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <AdminSidebar />
        <main style={{ flex: 1, overflow: 'auto', padding: '36px 40px', background: 'var(--color-bg-base)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
