import useSWR from 'swr';
import { useEffect } from 'react';
import type { User } from '@models/user/user.types';
import type { KeyedMutator } from 'swr';

export default function useUser(redirectURL: string): { user: User, mutate: KeyedMutator<User> } {
  const fetcher = (url:string) => fetch(url).then(r => r.json());
  const { data: user, mutate } = useSWR<User>('/api/user', fetcher);

  useEffect(() => {

  }, [user, redirectURL]);

  return { user, mutate };
}
