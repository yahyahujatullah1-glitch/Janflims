import type { StreamType } from '@/types/video';

export function getStreamType(url?: string | null): StreamType {
  if (!url || url.trim() === '') return 'none';
  if (url.endsWith('.m3u8'))                               return 'hls';
  if (url.match(/\.mp4(\?.*)?$/))                          return 'html5';
  return 'iframe';
}

export function buildEmbedUrl(url?: string | null): string | null {
  if (!url) return null;

  // YouTube long URL
  if (url.includes('youtube.com/watch')) {
    try {
      const id = new URL(url).searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    } catch { /* fall through */ }
  }

  // YouTube short URL
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0];
    if (id) return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0`;
  }

  // Bunny.net, Cloudflare Stream, or direct iframe — pass through
  return url;
}
