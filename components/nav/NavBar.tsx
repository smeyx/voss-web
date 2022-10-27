import fetchJSON from '@lib/fetchJSON';
import Link from 'next/link';
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
      <button onClick= { clickAction } className="p-2 px-4 text-white bg-purple-600 rounded transition-colors hover:bg-purple-800">
        <a className={ `font-medium uppercase` }>
          { children }
        </a>
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
    ? <AuthButton authLink="/api/logout" clickAction={ logoutAction } children={ "Logout" }/>
    : <AuthButton children={ "Login" } authLink="/login"/>

  return ( 
    <nav className="sticky top-0 flex flex-row justify-between mx-auto ml-20 md:py-6 md:mb-6 md:items-center">
        <Link href="/">
          <a className="font-medium uppercase transition-colors text-grey-900 hover:text-purple-600">
            VOSSS
          </a>
        </Link>
        <div className="mr-32 font-medium text-gray-800">
          { authButton }
        </div>
    </nav> 
  );
};

export default NavBar;
