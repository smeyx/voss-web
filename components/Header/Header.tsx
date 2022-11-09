import NavBar from '@components/nav/NavBar';
import type { User } from '@models/user/user.types';
import type { KeyedMutator } from 'swr';

type HeaderProps = {
  isLoggedIn: boolean,
  mutate: KeyedMutator<User>
};

const Header: React.FC<HeaderProps> = ({ isLoggedIn, mutate }): JSX.Element => {
  return ( 
    <NavBar isLoggedIn={ isLoggedIn } mutate={ mutate } />
  );
}

export default Header;
