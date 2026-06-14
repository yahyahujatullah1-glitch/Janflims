'use client';

import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { getStreamType, buildEmbedUrl } from '@/lib/playerUtils';
import type { Video } from '@/types/video';

interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const hlsRef    = useRef<any>(null);
  const streamType = getStreamType(video.streamUrl);
  const embedUrl   = buildEmbedUrl(video.streamUrl);

  useEffect(() => {
    if (streamType !== 'hls' || !videoRef.current) return;
    let cancelled = false;
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !videoRef.current) return;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(video.streamUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = video.streamUrl;
      }
    });
    return () => {
      cancelled = true;
      if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }
    };
  }, [video.streamUrl, streamType]);

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    inset:    0,
    width:    '100%',
    height:   '100%',
    background: '#000',
  };

  if (streamType === 'none') {
    return (
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {video.backdropUrl && (
          <img
            src={video.backdropUrl}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          />
        )}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--color-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: 'var(--shadow-glow)',
          }}>
            <Play size={28} fill="currentColor" color="var(--color-text-inverse)" />
          </div>
          <p className="font-display text-[22px] tracking-wider">{video.title}</p>
          <p style={{ color: 'var(--color-text-3)', fontSize: 13, marginTop: 6 }}>Stream URL not configured</p>
        </div>
      </div>
    );
  }

  if (streamType === 'html5') {
    return (
      <video
        ref={videoRef}
        src={video.streamUrl}
        controls
        autoPlay
        style={{ ...containerStyle, objectFit: 'contain' }}
      />
    );
  }

  if (streamType === 'hls') {
    return (
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ ...containerStyle, objectFit: 'contain' }}
      />
    );
  }

  // iframe (YouTube, Vimeo, Bunny, Cloudflare)
  return (
    <iframe
      src={embedUrl ?? ''}
      style={{ ...containerStyle, border: 'none' }}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title={video.title}
    />
  );
}
