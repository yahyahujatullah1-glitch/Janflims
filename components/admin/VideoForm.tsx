'use client';

import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { fmt } from '@/lib/format';
import type { VideoCreateInput } from '@/lib/validators';

interface VideoFormProps {
  onSuccess?: () => void;
}

const INITIAL: Partial<VideoCreateInput> = {
  title: '', slug: '', description: '', streamUrl: '',
  thumbnailUrl: '', backdropUrl: '', trailerUrl: '',
  type: 'movie', genre: '', releaseYear: new Date().getFullYear(),
  rating: 'PG-13', language: 'English', isFeatured: false,
};

export function VideoForm({ onSuccess }: VideoFormProps) {
  const [form,    setForm]    = useState<typeof INITIAL>(INITIAL);
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved,   setSaved]   = useState(false);

  const set = (key: string, value: unknown) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === 'title') {
      setForm((f) => ({ ...f, title: value as string, slug: fmt.slug(value as string) }));
    }
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!form.title)        errs.title        = 'Required';
    if (!form.streamUrl)    errs.streamUrl     = 'Required';
    if (!form.thumbnailUrl) errs.thumbnailUrl  = 'Required';
    if (!form.genre)        errs.genre         = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await api.videos.create(form);
      setSaved(true);
      setForm(INITIAL);
      setTimeout(() => setSaved(false), 3000);
      onSuccess?.();
    } catch (e: any) {
      setErrors({ general: e.message });
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof typeof INITIAL) => ({
    value:    String(form[key] ?? ''),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(key, e.target.value),
    error:    errors[key],
  });

  return (
    <div
      style={{
        background:   'var(--color-bg-surface)',
        border:       '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding:      28,
        marginBottom: 32,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--color-accent-dim)', border: '1px solid var(--color-accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
          <Plus size={16} />
        </div>
        <p style={{ fontWeight: 700, fontSize: 15 }}>Add New Video</p>
      </div>

      {/* Row 1: Title & Slug */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Input label="Title *"  placeholder="Movie title"     {...field('title')} />
        <Input label="Slug *"   placeholder="auto-generated"  {...field('slug')} />
      </div>

      {/* Row 2: URLs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Input label="Stream URL *"    placeholder="https://..."  {...field('streamUrl')} />
        <Input label="Thumbnail URL *" placeholder="https://..."  {...field('thumbnailUrl')} />
        <Input label="Backdrop URL"    placeholder="https://..."  {...field('backdropUrl')} />
        <Input label="Trailer URL"     placeholder="https://..."  {...field('trailerUrl')} />
      </div>

      {/* Description */}
      <div style={{ marginBottom: 16 }}>
        <Textarea label="Description *" placeholder="Synopsis..." {...field('description')} />
      </div>

      {/* Row 3: metadata */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 16 }}>
        <Select label="Type" {...field('type')}>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </Select>
        <Select label="Rating" {...field('rating')}>
          {['G','PG','PG-13','R','NC-17'].map((r) => <option key={r} value={r}>{r}</option>)}
        </Select>
        <Select label="Language" {...field('language')}>
          {['English','Hindi','Spanish','French','German','Japanese','Korean','Portuguese'].map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </Select>
        <Input label="Release Year" type="number" {...field('releaseYear')} />
      </div>

      {/* Row 4: more metadata */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 16 }}>
        <Input label="Genre (comma-sep)" placeholder="Action,Drama" {...field('genre')} />
        <Input label="IMDb Score"        placeholder="8.4"  type="number" step="0.1" {...field('imdbScore')} />
        <Input label="Duration (min)"    placeholder="120"  type="number" {...field('duration')} />
        <Input label="Cast"              placeholder="Actor 1, Actor 2" {...field('cast')} />
      </div>

      {/* Featured toggle */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => set('isFeatured', !form.isFeatured)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: form.isFeatured ? 'var(--color-accent-dim)' : 'var(--color-bg-surface-2)',
            border: `1px solid ${form.isFeatured ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-sm)',
            padding: '9px 16px',
            color: form.isFeatured ? 'var(--color-accent)' : 'var(--color-text-2)',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            transition: 'all var(--t-fast)',
          }}
        >
          {form.isFeatured ? <Check size={14} /> : <Plus size={14} />}
          {form.isFeatured ? 'Featured on Hero Slider ✓' : 'Mark as Featured'}
        </button>
      </div>

      {errors.general && (
        <p style={{ color: 'var(--color-danger)', fontSize: 13, marginBottom: 12 }}>{errors.general}</p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button variant="primary" icon={<Plus size={14} />} onClick={handleSubmit} loading={loading}>
          Save Video
        </Button>
        {saved && (
          <span style={{ color: 'var(--color-success)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Check size={14} /> Saved successfully!
          </span>
        )}
      </div>
    </div>
  );
}
