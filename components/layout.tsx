import Header from '@components/Header/Header';

type LayoutProps = {
  children: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="h-screen px-4 mx-auto">
      <Header/>
      <main className="container pt-5 mx-auto">{ children }</main>
    </div>
  );
}

export default Layout;
