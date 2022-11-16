import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';

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
      res.setHeader('location', '/login');
      res.statusCode = 302;
      res.end();
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
