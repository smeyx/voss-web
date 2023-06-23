import NavBar from '@components/nav/NavBar';
import useUser from '@lib/session/useUser';

const Header: React.FC = (): JSX.Element => {
  const { user, mutateUser } = useUser();
  return ( 
    <NavBar isLoggedIn={ user && user.isLoggedIn ? true : false} mutate = { mutateUser }/>
  );
}

export default Header;
