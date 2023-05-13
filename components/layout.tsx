import Head from 'next/head';
import Header from '@components/Header/Header';

type LayoutProps = {
  children: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
      <div className="h-screen mx-auto">
      <Head>
        <title>VOSS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
        <Header/>
        <main className="pt-1">{ children }</main>
      </div>
  );
}

export default Layout;
