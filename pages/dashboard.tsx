import type { NextPage, GetServerSideProps } from 'next/types';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import type { User } from '@models/user/user.types';

interface PageProps {
  user: User | false,
}

const Dashboard: NextPage<PageProps> = ({ user }) => {
  return (
    <>{ user && user.email}</>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    if(!req.session.user) {
      res.setHeader('location', '/login');
      res.statusCode = 302;
      res.end();
    }

    return {
      props: {
        user: req.session.user ? req.session.user : false,
      }
    }
  },
  sessionParameters
);

export default Dashboard;
