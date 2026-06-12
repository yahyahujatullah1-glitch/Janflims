export const fmt = {
  views: (n: number): string => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
  },

  duration: (min?: number | null): string => {
    if (!min || min === 0) return 'Series';
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  },

  imdb: (n?: number | null): string => (n != null ? n.toFixed(1) : '—'),

  year: (d: string | Date): number => new Date(d).getFullYear(),

  date: (d: string | Date): string =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    }),

  slug: (title: string): string =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim(),
};
