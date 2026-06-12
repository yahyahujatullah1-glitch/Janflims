import useSWR from 'swr';
import { api } from '@/lib/api';
import type { Category } from '@/types/category';

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    'categories',
    api.categories,
    { revalidateOnFocus: false, dedupingInterval: 60_000 }
  );

  return { categories: data ?? [], loading: isLoading, error };
}
