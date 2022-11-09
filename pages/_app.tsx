import '../styles/globals.css'
import Layout from '../components/layout';
import useUser from '@lib/useUser';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const { user, mutateUser } = useUser();
  return (
    <Layout isLoggedIn={ user && user.isLoggedIn ? true : false} mutate = { mutateUser }>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
