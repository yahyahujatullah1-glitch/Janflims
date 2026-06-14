'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { fmt } from '@/lib/format';
import type { VideoCardProps } from '@/types/video';
import clsx from 'clsx';

const WIDTHS = { sm: 165, md: 210, lg: 260 };

export function VideoCard({ video, onSelect, showProgress, progress, size = 'md' }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const w = WIDTHS[size];
  const h = Math.round(w * 0.5625);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(video)}
      style={{
        width:      w,
        flexShrink: 0,
        borderRadius: 'var(--radius-md)',
        overflow:   'hidden',
        background: 'var(--color-bg-surface)',
        cursor:     'pointer',
        transform:  hovered ? 'scale(1.055) translateY(-5px)' : 'scale(1)',
        boxShadow:  hovered ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        transition: 'transform var(--t-spring), box-shadow var(--t-base)',
        zIndex:     hovered ? 10 : 1,
        position:   'relative',
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: h, position: 'relative', overflow: 'hidden' }}>
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes={`${w}px`}
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
          unoptimized
        />
        {/* Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,9,13,0.88) 0%, transparent 55%)' }} />

        {/* Type badge */}
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <Badge variant="accent">{video.type}</Badge>
        </div>

        {/* IMDb */}
        {video.imdbScore && (
          <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', alignItems: 'center', gap: 3, color: '#f5c518', fontSize: 11, fontWeight: 700 }}>
            <Star size={10} fill="#f5c518" stroke="none" />
            {fmt.imdb(video.imdbScore)}
          </div>
        )}

        {/* Play overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity var(--t-base)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--color-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(212,168,67,0.5)',
          }}>
            <Play size={16} fill="currentColor" color="var(--color-text-inverse)" />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: '10px 12px 14px' }}>
        <p className="truncate" style={{ fontWeight: 600, fontSize: 13, marginBottom: 5, color: 'var(--color-text-1)' }}>
          {video.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-text-3)' }}>
          <span>{video.releaseYear}</span>
          <span>·</span>
          <span className="truncate">{video.genre[0]}</span>
          <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>{fmt.views(video.views)}</span>
        </div>
        {showProgress && <ProgressBar value={progress ?? 0} height={2} />}
      </div>
    </div>
  );
}
