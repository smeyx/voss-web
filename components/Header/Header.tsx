import NavBar from '@components/nav/NavBar';
import useUser from '@lib/useUser';

export default function Header(): JSX.Element {
  const { user, mutateUser } = useUser();

  return ( 
    <NavBar isLoggedIn={ user && user.isLoggedIn ? true : false } mutate={ mutateUser } />
  );
}
