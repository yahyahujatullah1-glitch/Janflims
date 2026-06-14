'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fmt } from '@/lib/format';
import { api } from '@/lib/api';
import type { Video } from '@/types/video';

interface VideoTableProps {
  videos:    Video[];
  onMutate?: () => void;
}

export function VideoTable({ videos, onMutate }: VideoTableProps) {
  const [deleting, setDeleting] = useState<number | null>(null);
  const [editing,  setEditing]  = useState<number | null>(null);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this video? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await api.videos.delete(id);
      onMutate?.();
      router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontWeight: 700, fontSize: 13 }}>All Videos</p>
        <p style={{ color: 'var(--color-text-3)', fontSize: 12 }}>{videos.length} total</p>
      </div>

      {videos.map((v, i) => (
        <div
          key={v.id}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 20px',
            borderBottom: i < videos.length - 1 ? '1px solid var(--color-border)' : 'none',
            transition: 'background var(--t-fast)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-surface-2)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <Image
            src={v.thumbnailUrl}
            alt={v.title}
            width={58}
            height={33}
            style={{ objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
            unoptimized
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="truncate" style={{ fontWeight: 600, fontSize: 13 }}>{v.title}</p>
            <p style={{ color: 'var(--color-text-3)', fontSize: 11, marginTop: 1 }}>
              {v.type} · {v.releaseYear} · {v.language} · {v.genre.join(', ')}
            </p>
          </div>
          <Badge variant={v.isFeatured ? 'accent' : 'default'}>{v.isFeatured ? 'Featured' : 'Normal'}</Badge>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#f5c518', fontSize: 12 }}>
            <Star size={11} fill="#f5c518" stroke="none" />
            {fmt.imdb(v.imdbScore)}
          </div>
          <span style={{ color: 'var(--color-text-3)', fontSize: 12, width: 60, textAlign: 'right' }}>
            {fmt.views(v.views)}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button variant="outline" size="sm" onClick={() => { window.scrollTo({top:0,behavior:'smooth'}); alert('To edit, delete and re-add the video — full edit form coming soon.'); }}>Edit</Button>
            <Button
              variant="danger"
              size="sm"
              loading={deleting === v.id}
              onClick={() => handleDelete(v.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
