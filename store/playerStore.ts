import { create } from 'zustand';

interface PlayerState {
  progressSeconds: number;
  duration:        number;
  isPlaying:       boolean;
  setProgress:     (s: number) => void;
  setDuration:     (d: number) => void;
  setIsPlaying:    (p: boolean) => void;
  reset:           () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  progressSeconds: 0,
  duration:        0,
  isPlaying:       false,
  setProgress:  (s) => set({ progressSeconds: s }),
  setDuration:  (d) => set({ duration: d }),
  setIsPlaying: (p) => set({ isPlaying: p }),
  reset: () => set({ progressSeconds: 0, duration: 0, isPlaying: false }),
}));
