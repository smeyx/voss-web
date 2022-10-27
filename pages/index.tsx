import type { NextPage, NextApiRequest, GetServerSideProps } from 'next'
import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';

interface PageProps {
  isLoggedIn: boolean;
}

const Home: NextPage<PageProps> = ({ isLoggedIn }) => {
  return (
    <>
      <Head>
        <title>VOSS - Your friendly invoice companion</title>
      </Head>
      <div className="container flex justify-center mx-auto text-xl">
        <p>
          { isLoggedIn && 
            'You are currently logged in'
          }
        </p>
      </div>
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
      props: {
        isLoggedIn: req.session.user?.isLoggedIn ? true : false,
      },
    }
  }, 
  sessionParameters
);

export default Home;
