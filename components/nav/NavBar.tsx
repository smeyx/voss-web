import fetchJSON from '@lib/fetchJSON';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@images/logo_w.svg';
import { useRouter } from 'next/router';
import AuthButton from '@components/AuthButton';
import type { KeyedMutator } from 'swr';
import type { User } from '@models/user/user.types';

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
    ? <AuthButton authLink="/api/logout" clickAction={ logoutAction }>Logout</AuthButton>
    : <AuthButton authLink="/login">Login</AuthButton>

  return ( 
    <nav className="sm:sticky sm:bg-neutral-50 dark:sm:bg-neutral-800 top-0 flex flex-row items-center justify-between py-4 mx-auto">
      <Link href="/" className="text-primary-500 dark:text-secondary-500" aria-label="Back to Home" >
        <Logo height="30" style={{ color: 'inherit' }} alt="Logo showing a Fox and the text VOSS" role="graphics-document"/>
      </Link>
      <div className="font-medium text-gray-800">
        { authButton }
      </div>
    </nav> 
  );
};

export default NavBar;
