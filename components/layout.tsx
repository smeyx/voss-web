import NavBar from './nav/NavBar';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <NavBar />
      <main>{ children }</main>
    </>
  );
}

export default Layout;
