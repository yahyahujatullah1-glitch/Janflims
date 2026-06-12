import { create } from 'zustand';
import type { Video } from '@/types/video';

interface UIState {
  activeVideo:      Video | null;
  authModal:        'login' | 'register' | null;
  mobileMenuOpen:   boolean;
  setActiveVideo:   (v: Video | null) => void;
  setAuthModal:     (m: 'login' | 'register' | null) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu:  () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeVideo:      null,
  authModal:        null,
  mobileMenuOpen:   false,
  setActiveVideo:   (v) => set({ activeVideo: v }),
  setAuthModal:     (m) => set({ authModal: m }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu:  () => set({ mobileMenuOpen: false }),
}));
