import type { NextPage, GetServerSideProps } from 'next/types';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import Dashboard from '@components/Dashboard/';
import type { User } from '@models/user/user.types';

interface PageProps {
  user: User,
}

const Overview: NextPage<PageProps> = ({ user }) => {

  return (
    <Dashboard title="Overview" user={ user } activeTab={ 'overview' }>
      <span>{ 'this is a overview' }</span>
    </Dashboard>
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
        user: req.session.user,
      }
    }
  },
  sessionParameters
);

export default Overview;
