import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label:   string;
  value:   string | number;
  Icon:    LucideIcon;
  delta?:  string;
  color?:  string;
}

export function StatsCard({ label, value, Icon, delta, color = 'var(--color-accent)' }: StatsCardProps) {
  return (
    <div
      style={{
        background:   'var(--color-bg-surface)',
        border:       '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding:      '20px 24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>
          {label}
        </p>
        <Icon size={16} color={color} style={{ opacity: 0.8 }} />
      </div>
      <p className="font-display" style={{ fontSize: 38, color, lineHeight: 1 }}>{value}</p>
      {delta && (
        <p style={{ fontSize: 11, color: 'var(--color-success)', marginTop: 8 }}>↑ {delta} this month</p>
      )}
    </div>
  );
}
