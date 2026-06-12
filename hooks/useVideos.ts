import useSWR from 'swr';
import { api } from '@/lib/api';
import type { Video } from '@/types/video';

interface UseVideosParams {
  genre?:    string;
  type?:     'movie' | 'series';
  sort?:     'views' | 'imdb' | 'year';
  limit?:    number;
  featured?: boolean;
}

export function useVideos(params: UseVideosParams = {}) {
  const key = ['videos', JSON.stringify(params)] as const;

  const { data, error, isLoading, mutate } = useSWR<Video[]>(
    key,
    () => api.videos.list(params as Record<string, string | number | boolean | undefined>),
    { revalidateOnFocus: false, dedupingInterval: 30_000 }
  );

  return {
    data:    data ?? [],
    loading: isLoading,
    error,
    mutate,
  };
}
