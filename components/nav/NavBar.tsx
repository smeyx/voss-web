import fetchJSON from '@lib/fetchJSON';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@images/logo_w.svg';
import { useRouter } from 'next/router';
import AuthButton from '@components/AuthButton';
import type { KeyedMutator } from 'swr';
import type { User } from '@models/user/user.types';
import { Gear, House } from 'phosphor-react';

type NavBarProps = {
  isLoggedIn: boolean,
  mutate: KeyedMutator<User>
};

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, mutate }): JSX.Element => {
  const router = useRouter();
  const logoutAction = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    const logout: boolean = await fetchJSON('/api/logout', { method: 'POST' });
    if(logout) {
      // TODO: looks weird? is weird.
      mutate();
      router.push('/login');
    }
  };

  const authButton = isLoggedIn 
    ? <AuthButton authLink="/api/logout" clickAction={ logoutAction }>Sign out</AuthButton>
    : <AuthButton authLink="/login">Sign in</AuthButton>

  return ( 
    <>
      <nav className="hidden sm:flex bg-inherit top-0 sm:flex-row items-center justify-between pt-4 px-4 mx-auto">
        <Link href="/" className="text-primary-500 dark:text-secondary-500" aria-label="Back to Home" >
          <Logo height="30" style={{ color: 'inherit' }} alt="Logo showing a Fox and the text VOSS" role="graphics-document" />
        </Link>
        <div className="text-gray-800 flex items-center gap-4">
          { isLoggedIn &&
            <>
              <Link href="/dashboard/overview" title="Home" className="text-primary-500 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-secondary-600 transition-colors">
                <House size="24" />
              </Link>
              <Link href="/settings" title="Settings" className="text-primary-500 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-secondary-600 transition-colors">
                <Gear size="24" />
              </Link>
            </>
          }
            {authButton}
        </div>
      </nav>
      <nav className="sm:hidden absolute z-10 text-white dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 top-0 left-0 right-0 bottom-0 flex justify-center">
        <div className="flex flex-col mt-10 container mx-10">
          { isLoggedIn &&
            <>
              <Link href="/dashboard/overview" title="Home" className="flex gap-4 py-4 border-b hover:text-primary-600 dark:hover:text-secondary-600 transition-colors">
                <House size="24" />
                Home
              </Link>
              <Link href="/settings" title="Settings" className="flex gap-4 py-4 border-b hover:text-primary-600 dark:hover:text-secondary-600 transition-colors">
                <Gear size="24" />
                Settings
              </Link>
            </>
          }
          <div className="mt-4">
            {authButton}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
