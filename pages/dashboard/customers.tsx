import { useState } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import Dashboard from '@components/Dashboard/';
import NewCustomerForm from '@components/NewCustomerForm';
import { Plus } from 'phosphor-react';
import type { User } from '@models/user/user.types';
import type { NextPage, GetServerSideProps } from 'next/types';

interface PageProps {
  user: User,
}

const Customers: NextPage<PageProps> = ({ user }) => {
  let key = 1;
  const [ createCustomer, setCreateCustomer ] = useState<boolean>(false);

  const clearCustomerForm = () => {
    key=2;
  };

  return (
    <Dashboard key={ key } user={ user } activeTab={ 'customers' }>
      <>
        <nav>
          <button 
            onClick={ () => setCreateCustomer(!createCustomer) } 
            className="flex items-center px-4 py-2 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">
            <Plus size="16" className="mr-1" weight="bold"/>
            New customer
          </button>
        </nav>
        { !createCustomer && 
          <div>{ 'this is the customers view' }</div>
        }

        { createCustomer && 
          <NewCustomerForm key={ createCustomer }/>
        }
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
