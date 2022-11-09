import Header from '@components/Header/Header';
import type { KeyedMutator } from 'swr';
import type { User } from '@models/user/user.types';

type LayoutProps = {
  children: React.ReactNode,
  isLoggedIn: boolean,
  mutate: KeyedMutator<User>,
}

const Layout = ({ children, isLoggedIn, mutate }: LayoutProps): JSX.Element => {
  return (
    <div className="w-full h-screen dark:bg-gray-800 dark:text-white">
      <Header isLoggedIn={ isLoggedIn } mutate={ mutate }/>
      <main className="container mx-auto">{ children }</main>
    </div>
  );
}

export default Layout;
