import { useQuery } from '@tanstack/react-query';
import type { ApiUser } from '@/types/user';

async function fetchUsers(): Promise<ApiUser[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export function useUsersQuery() {
  return useQuery<ApiUser[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
}
