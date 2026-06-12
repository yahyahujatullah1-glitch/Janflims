import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Video } from '@/types/video';

interface AuthState {
  watchlist:            Video[];
  addToWatchlist:       (v: Video) => void;
  removeFromWatchlist:  (id: number) => void;
  toggleWatchlist:      (v: Video) => void;
  isInWatchlist:        (id: number) => boolean;
  clearWatchlist:       () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (v) =>
        set((s) => ({
          watchlist: s.watchlist.find((x) => x.id === v.id)
            ? s.watchlist
            : [v, ...s.watchlist],
        })),

      removeFromWatchlist: (id) =>
        set((s) => ({ watchlist: s.watchlist.filter((v) => v.id !== id) })),

      toggleWatchlist: (v) => {
        const { isInWatchlist, addToWatchlist, removeFromWatchlist } = get();
        isInWatchlist(v.id) ? removeFromWatchlist(v.id) : addToWatchlist(v);
      },

      isInWatchlist: (id) => get().watchlist.some((v) => v.id === id),

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    { name: 'janflims-watchlist' }
  )
);
