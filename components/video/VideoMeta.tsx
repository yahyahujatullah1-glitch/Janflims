import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { fmt } from '@/lib/format';
import type { Video } from '@/types/video';

interface VideoMetaProps {
  video: Video;
}

export function VideoMeta({ video }: VideoMetaProps) {
  return (
    <div>
      <h1 className="font-display text-[var(--text-3xl)] mb-3 leading-none">{video.title}</h1>

      {/* Inline metadata row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span style={{ color: 'var(--color-success)', fontSize: 13, fontWeight: 600 }}>{video.releaseYear}</span>
        <Badge>{video.rating}</Badge>
        {video.duration && video.duration > 0 && (
          <span style={{ color: 'var(--color-text-2)', fontSize: 13 }}>{fmt.duration(video.duration)}</span>
        )}
        <Badge variant={video.type === 'movie' ? 'accent' : 'success'}>{video.type}</Badge>
        <Badge>{video.language}</Badge>
        {video.imdbScore && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f5c518', fontSize: 13, fontWeight: 700 }}>
            <Star size={12} fill="#f5c518" stroke="none" />
            {fmt.imdb(video.imdbScore)} IMDb
          </div>
        )}
        <span style={{ color: 'var(--color-text-3)', fontSize: 12 }}>{fmt.views(video.views)} views</span>
      </div>

      {/* Description */}
      <p style={{ color: 'var(--color-text-2)', lineHeight: 1.75, fontSize: 14, marginBottom: 16 }}>
        {video.description}
      </p>

      {/* Cast */}
      {video.cast && (
        <p style={{ fontSize: 13, color: 'var(--color-text-3)', marginBottom: 4 }}>
          <span style={{ color: 'var(--color-text-2)', fontWeight: 600 }}>Cast: </span>
          {video.cast}
        </p>
      )}
    </div>
  );
}
