import type { NextPage, NextApiRequest, GetServerSideProps } from 'next'
import type { User } from '@models/user/user.types';
import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import useUser from '@lib/useUser';

interface PageProps {
  text: string;
}

const Home: NextPage<PageProps> = ({ text }) => {
  const user: User | undefined = useUser('/login');
  return (
    <>
      <Head>
        <title>VOSSS - Your friendly invoice companion</title>
      </Head>
      email: { user ? user.email : '' }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req: NextApiRequest }) => {
    return {
      props: {
        text: 'nice text',
      },
    }
  }, 
  sessionParameters
);

export default Home
