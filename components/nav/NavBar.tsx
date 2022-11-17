import fetchJSON from '@lib/fetchJSON';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@images/logo_w.svg';
import { useRouter } from 'next/router';
import type { KeyedMutator } from 'swr';
import type { User } from '@models/user/user.types';
import type { ReactElement } from 'react';

type NavBarProps = {
  isLoggedIn: boolean,
  mutate: KeyedMutator<User>
};

type AuthButtonProps = {
  clickAction?: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
  authLink: string,
  children: ReactElement | string,
};

const AuthButton: React.FC<AuthButtonProps> = ({ clickAction, authLink = '', children }): JSX.Element => {
  return (
    <Link href={ authLink } passHref>
      <button onClick={ clickAction } className="p-2 px-4 text-white uppercase rounded bg-primary-500 transition-colors hover:bg-primary-600 dark:bg-secondary-500 dark:hover:bg-secondary-600 dark:text-neutral-800">
          { children }
      </button>
    </Link>
  )
};

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, mutate }): JSX.Element => {
  const router = useRouter();
  const logoutAction = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    const logout: boolean = await fetchJSON('/api/logout', { method: 'POST' });
    if(logout) {
      // TODO: looks weird? is weird.
      mutate(undefined);
      router.push('/login');
    }
  };

  const authButton = isLoggedIn 
    ? <AuthButton authLink="/api/logout" clickAction={ logoutAction }>Logout</AuthButton>
    : <AuthButton authLink="/login">Login</AuthButton>

  return ( 
    <nav className="sticky top-0 flex flex-row items-center justify-between py-4 mx-auto">
      <Link href="/" className="text-primary-500 dark:text-secondary-500">
        <Logo height="30" style={{ color: 'inherit' }} />
      </Link>
      <div className="font-medium text-gray-800">
        { authButton }
      </div>
    </nav> 
  );
};

export default NavBar;
