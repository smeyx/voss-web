import useSWR from 'swr';
import { useEffect } from 'react';
import Router from 'next/router';
import fetchJSON from '@lib/fetchJSON';
import type { User } from '@models/user/user.types';
import type { KeyedMutator } from 'swr';

export default function useUser(redirectURL: string = '', redirectIfLoggedIn: boolean = false): { user: User | undefined, mutateUser: KeyedMutator<User> } {
  const fetcher = (url: string) => fetch(url).then(r => r.json())

  const { data: user, mutate: mutateUser, error } = useSWR<User>('/api/user', fetcher);
  if(error) console.log(error);

  useEffect(() => {
    if(!user || !redirectURL) return;

    if(!user?.isLoggedIn && redirectURL || user?.isLoggedIn && redirectIfLoggedIn && redirectURL) {
      Router.push(redirectURL);
    }
  }, [user, redirectURL, redirectIfLoggedIn]);

  return { user, mutateUser };
}
