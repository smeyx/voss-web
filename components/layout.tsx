import Header from '@components/Header/Header';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Header />
      <main>{ children }</main>
    </>
  );
}

export default Layout;
