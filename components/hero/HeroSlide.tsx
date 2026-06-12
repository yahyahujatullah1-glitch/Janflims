import React from 'react';
import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fmt } from '@/lib/format';
import type { Video } from '@/types/video';

interface HeroSlideProps {
  video:  Video;
  onPlay: (v: Video) => void;
}

export function HeroSlide({ video, onPlay }: HeroSlideProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Backdrop */}
      <Image
        src={video.backdropUrl ?? video.thumbnailUrl}
        alt={video.title}
        fill
        priority
        style={{ objectFit: 'cover' }}
        className="anim-fadeIn"
        unoptimized
      />

      {/* Gradients */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(6,9,13,0.97) 0%,rgba(6,9,13,0.65) 52%,rgba(6,9,13,0.12) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(0deg,var(--color-bg-base) 0%,transparent 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(180deg,rgba(0,0,0,0.45) 0%,transparent 100%)' }} />

      {/* Content */}
      <div
        className="anim-slideLeft"
        style={{ position: 'absolute', bottom: 100, left: 'var(--page-px)', maxWidth: 590 }}
      >
        {/* Genre + language badges */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {video.genre.slice(0, 3).map((g) => (
            <Badge key={g} variant="accent">{g}</Badge>
          ))}
          <Badge>{video.language}</Badge>
        </div>

        {/* Title */}
        <h1
          className="font-display"
          style={{
            fontSize:    'clamp(44px, 6vw, var(--text-hero))',
            lineHeight:  0.95,
            marginBottom:18,
            textShadow:  '0 2px 28px rgba(0,0,0,0.55)',
            color:       '#fff',
          }}
        >
          {video.title}
        </h1>

        {/* Description */}
        <p
          className="line-clamp-3"
          style={{
            fontSize:     14,
            color:        'rgba(237,234,224,0.72)',
            lineHeight:   1.72,
            marginBottom: 30,
            maxWidth:     460,
          }}
        >
          {video.description}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            size="lg"
            icon={<Play size={16} fill="currentColor" />}
            onClick={() => onPlay(video)}
          >
            Watch Now
          </Button>
          <Button
            variant="ghost"
            size="lg"
            icon={<Info size={16} />}
            onClick={() => onPlay(video)}
          >
            More Info
          </Button>
          {video.imdbScore && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f5c518', marginLeft: 8 }}>
              <Star size={14} fill="#f5c518" stroke="none" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>{fmt.imdb(video.imdbScore)}</span>
              <span style={{ color: 'var(--color-text-3)', fontSize: 12, marginLeft: 2 }}>IMDb</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
