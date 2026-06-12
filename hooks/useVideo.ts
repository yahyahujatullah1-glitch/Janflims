import useSWR from 'swr';
import { api } from '@/lib/api';
import type { Video } from '@/types/video';

export function useVideo(id?: number) {
  const { data, error, isLoading } = useSWR<Video>(
    id ? ['video', id] : null,
    () => api.videos.get(id!),
    { revalidateOnFocus: false }
  );

  return { video: data, loading: isLoading, error };
}
