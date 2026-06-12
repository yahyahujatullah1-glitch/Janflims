import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/db';
import { StatsGrid } from '@/components/admin/StatsGrid';
import { fmt } from '@/lib/format';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

async function getDashboardData() {
  const [
    { count: videoCount },
    { count: userCount },
    { data: topVideos },
    { data: recentUsers },
    { data: viewsData },
    { data: imdbData },
  ] = await Promise.all([
    supabase.from('videos').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('videos').select('*').order('views', { ascending: false }).limit(8),
    supabase.from('users').select('id, name, email, role, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('videos').select('views'),
    supabase.from('videos').select('imdb_score'),
  ]);

  const totalViews = (viewsData ?? []).reduce((sum, v) => sum + (v.views ?? 0), 0);
  const scores = (imdbData ?? []).map(v => v.imdb_score).filter(Boolean) as number[];
  const avgImdb = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '—';

  return {
    totalVideos: videoCount ?? 0,
    totalViews:  fmt.views(totalViews),
    avgImdb,
    totalUsers:  userCount ?? 0,
    topVideos: (topVideos ?? []).map(v => ({
      ...v,
      imdbScore: v.imdb_score ? Number(v.imdb_score) : null,
      genre:     v.genre ? v.genre.split(',') : [],
      createdAt: v.created_at,
      thumbnailUrl: v.thumbnail_url,
      releaseYear:  v.release_year,
      isFeatured:   v.is_featured,
    })),
    recentUsers: (recentUsers ?? []).map(u => ({
      ...u,
      createdAt: u.created_at,
    })),
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Dashboard</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>Welcome back. Here's what's happening on JanFlims.</p>
      </div>

      <StatsGrid
        totalVideos={data.totalVideos}
        totalViews={data.totalViews}
        avgImdb={data.avgImdb}
        totalUsers={data.totalUsers}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        {/* Top Content */}
        <div>
          <h2 className="font-display" style={{ fontSize: 20, marginBottom: 16, color: 'var(--color-text-2)', letterSpacing: '0.06em' }}>TOP CONTENT</h2>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {data.topVideos.map((v, i) => (
              <div
                key={v.id}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', borderBottom: i < data.topVideos.length - 1 ? '1px solid var(--color-border)' : 'none', transition: 'background var(--t-fast)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-surface-2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span className="font-display" style={{ color: i < 3 ? 'var(--color-accent)' : 'var(--color-text-3)', width: 26, fontSize: 20 }}>#{i + 1}</span>
                <Image src={v.thumbnailUrl} alt={v.title} width={58} height={33} style={{ objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} unoptimized />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</p>
                  <p style={{ color: 'var(--color-text-3)', fontSize: 11, marginTop: 1 }}>{v.genre.join(', ')} · {v.releaseYear}</p>
                </div>
                <Badge variant={v.isFeatured ? 'accent' : 'default'}>{v.isFeatured ? 'Featured' : 'Normal'}</Badge>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#f5c518', fontSize: 12 }}>
                  <Star size={11} fill="#f5c518" stroke="none" />
                  {fmt.imdb(v.imdbScore)}
                </div>
                <div style={{ textAlign: 'right', minWidth: 56 }}>
                  <p style={{ fontWeight: 700, fontSize: 13 }}>{fmt.views(v.views)}</p>
                  <p style={{ color: 'var(--color-text-3)', fontSize: 10 }}>views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div>
          <h2 className="font-display" style={{ fontSize: 20, marginBottom: 16, color: 'var(--color-text-2)', letterSpacing: '0.06em' }}>RECENT USERS</h2>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {data.recentUsers.map((u, i) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < data.recentUsers.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'var(--color-text-inverse)', flexShrink: 0 }}>
                  {u.name[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
                  <p style={{ color: 'var(--color-text-3)', fontSize: 11 }}>{fmt.date(u.createdAt)}</p>
                </div>
                <Badge variant={u.role === 'admin' ? 'accent' : 'default'}>{u.role}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
                  }
