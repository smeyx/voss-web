import useSWR from 'swr';
import type { User } from '@models/user/user.types';

export default function useUser(redirectURL: string): User | false {
  const fetcher = (url:string) => fetch(url).then(r => r.json());
  const { data } = useSWR<User>('/api/user', fetcher);

  if(data) return data;
  return false;
}
