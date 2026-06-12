'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from './HeroSlide';
import { HeroDots } from './HeroDots';
import type { Video } from '@/types/video';

interface HeroSliderProps {
  videos: Video[];
}
export function HeroSlider({ videos }: HeroSliderProps) {
  const { setActiveVideo } = useUIStore();
  const [idx,    setIdx]    = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % videos.length);
    }, INTERVAL);
  };

  useEffect(() => {
    if (!videos.length) return;
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, videos.length]);

  const goTo = (i: number) => {
    setIdx(i);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!paused) startTimer();
  };

  const prev = () => goTo((idx - 1 + videos.length) % videos.length);
  const next = () => goTo((idx + 1) % videos.length);

  if (!videos.length) return null;

  return (
    <div
      style={{ position: 'relative', height: 580, overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <HeroSlide video={videos[idx]} onPlay={onPlay} />

      {/* Arrow: prev */}
      <button
        onClick={prev}
        style={{
          position: 'absolute', left: 20, top: '50%',
          transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid var(--color-border-hover)',
          color: 'var(--color-text-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(6px)',
          transition: 'background var(--t-fast)',
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Arrow: next */}
      <button
        onClick={next}
        style={{
          position: 'absolute', right: 20, top: '50%',
          transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid var(--color-border-hover)',
          color: 'var(--color-text-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(6px)',
          transition: 'background var(--t-fast)',
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 28, left: 'var(--page-px)' }}>
        <HeroDots count={videos.length} active={idx} onChange={goTo} />
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.07)' }}>
        <div
          key={`${idx}-${paused}`}
          style={{
            height:     '100%',
            background: 'var(--color-accent)',
            width:      paused ? '0%' : '100%',
            transition: paused ? 'none' : `width ${INTERVAL}ms linear`,
          }}
        />
      </div>
    </div>
  );
}
