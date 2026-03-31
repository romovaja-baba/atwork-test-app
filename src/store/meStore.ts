import { create } from 'zustand';
import type { User } from '@/types/user';

const AVATAR_BASE = 'https://api.dicebear.com/9.x/thumbs/svg?seed=';

export function createMeProfile(name: string, seed: string, extra?: Partial<User>): User {
  return {
    id: 0,
    name,
    username: seed,
    email: '',
    city: '',
    phone: '',
    companyName: '',
    status: 'active',
    avatar: `${AVATAR_BASE}${encodeURIComponent(seed)}`,
    ...extra,
  };
}

interface MeStore {
  me: User | null;
  setMe: (user: User) => void;
  updateMe: (data: Partial<User>) => void;
  clearMe: () => void;
}

export const useMeStore = create<MeStore>((set) => ({
  me: null,
  setMe: (user) => set({ me: user }),
  updateMe: (data) =>
    set((state) => ({
      me: state.me ? { ...state.me, ...data } : null,
    })),
  clearMe: () => set({ me: null }),
}));