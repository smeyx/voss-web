import type { NextPage, GetServerSideProps } from 'next/types';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import Dashboard from '@components/Dashboard/';
import type { User } from '@models/user/user.types';
import { Plus } from 'phosphor-react';

interface PageProps {
  user: User,
}

const Customers: NextPage<PageProps> = ({ user }) => {

  return (
    <Dashboard user={ user } activeTab={ 'customers' }>
      <>
        <nav>
          <button className="p-1 border rounded-full border-primary-500 hover:bg-primary-600 dark:border-secondary-500 dark:hover:bg-secondary-600 transition-colors">
            <Plus size="20" />
          </button>
        </nav>
        <span>{ 'this is the customers view' }</span>
      </>
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

export default Customers;
