import React from 'react';
import { Film, Eye, Star, Grid3x3 } from 'lucide-react';
import { StatsCard } from './StatsCard';

interface StatsGridProps {
  totalVideos: number;
  totalViews:  string;
  avgImdb:     string;
  totalUsers:  number;
}

export function StatsGrid({ totalVideos, totalViews, avgImdb, totalUsers }: StatsGridProps) {
  const cards = [
    { label: 'Total Videos', value: totalVideos, Icon: Film,     delta: '3',   color: 'var(--color-accent)' },
    { label: 'Total Views',  value: totalViews,  Icon: Eye,      delta: '12K', color: 'var(--color-accent)' },
    { label: 'Avg IMDb',     value: avgImdb,     Icon: Star,     color: '#f5c518' },
    { label: 'Total Users',  value: totalUsers,  Icon: Grid3x3,  color: 'var(--color-success)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 36 }}>
      {cards.map((c) => <StatsCard key={c.label} {...c} />)}
    </div>
  );
}
