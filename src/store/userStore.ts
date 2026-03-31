import { create } from 'zustand';
import type { ApiUser, User } from '@/types/user';

const AVATAR_BASE = 'https://api.dicebear.com/9.x/thumbs/svg?seed=';

function mapApiUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    name: apiUser.name,
    username: apiUser.username,
    email: apiUser.email,
    city: apiUser.address.city,
    phone: apiUser.phone,
    companyName: apiUser.company.name,
    status: 'active',
    avatar: `${AVATAR_BASE}${encodeURIComponent(apiUser.username)}`,
  };
}

interface UserStore {
  users: User[];
  initialized: boolean;
  initUsers: (apiUsers: ApiUser[]) => void;
  archiveUser: (id: number) => void;
  hideUser: (id: number) => void;
  restoreUser: (id: number) => void;
  updateUser: (id: number, data: Partial<User>) => void;
  getUserById: (id: number) => User | undefined;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  initialized: false,

  initUsers: (apiUsers) => {
    if (get().initialized) return;
    const users = apiUsers.slice(0, 6).map(mapApiUser);
    set({ users, initialized: true });
  },

  archiveUser: (id) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, status: 'archived' } : u
      ),
    })),

  hideUser: (id) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, status: 'hidden' } : u
      ),
    })),

  restoreUser: (id) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, status: 'active' } : u
      ),
    })),

  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...data } : u
      ),
    })),

  getUserById: (id) => get().users.find((u) => u.id === id),
}));
