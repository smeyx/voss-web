import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session/session';

interface PageProps {
  isLoggedIn: boolean;
}

const Home: NextPage<PageProps> = ({ isLoggedIn }) => {
  return (
    <>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    const user = req.session.user;

    if(user === undefined) {
      return {
        redirect: {
          statusCode: 302,
          destination: '/login',
        }
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: '/dashboard/overview',
      }
    }
  }, 
  sessionParameters
);

export default Home;
