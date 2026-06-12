import type { Video } from '@/types/video';
import type { Category } from '@/types/category';
import type { User } from '@/types/user';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message ?? `Request failed: ${res.status}`);
  }
  return json.data as T;
}

export const api = {
  videos: {
    list: (params?: Record<string, string | number | boolean | undefined>) => {
      const filtered = Object.fromEntries(
        Object.entries(params ?? {}).filter(([, v]) => v !== undefined && v !== '')
      );
      const qs = new URLSearchParams(filtered as Record<string, string>).toString();
      return request<Video[]>(`/videos${qs ? `?${qs}` : ''}`);
    },
    get:    (id: number)               => request<Video>(`/videos/${id}`),
    create: (body: unknown)            => request<Video>('/videos', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: number, body: unknown)=> request<Video>(`/videos/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id: number)               => request<void>(`/videos/${id}`, { method: 'DELETE' }),
  },

  categories: () => request<Category[]>('/categories'),

  search: (q: string, filters?: Record<string, string>) => {
    const params = new URLSearchParams({ q, ...(filters ?? {}) }).toString();
    return request<Video[]>(`/search?${params}`);
  },

  recommend: (videoId: number) =>
    request<Video[]>(`/recommend?videoId=${videoId}`),

  watch: (body: { videoId: number; progressSeconds: number }) =>
    request<null>('/watch', { method: 'POST', body: JSON.stringify(body) }),

  users: {
    list: () => request<User[]>('/users'),
  },

  stats: () => request<{
    totalVideos: number;
    totalViews:  number;
    avgImdb:     number;
    totalUsers:  number;
  }>('/stats'),
};
