import { useState } from 'react';
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
  const [ createCustomer, setCreateCustomer ] = useState<boolean>(false);
  const [ customerName, setCustomerName ] = useState<string>('');

  return (
    <Dashboard user={ user } activeTab={ 'customers' }>
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
          <div className="p-4 mt-10 rounded-md bg-neutral-100 dark:bg-neutral-700" >
            <h1 className="text-lg font-bold">Create a new Customer</h1>
            <form className="flex flex-col flex-1 mt-4 gap-2">
              <label htmlFor="customer_name">Name</label>
              <input type="text" 
                placeholder="Customer name" 
                id="customer_name" 
                required 
                value={ customerName } 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerName(e.target.value) } } 
                className="p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
              <label htmlFor="customer_address_street">Street</label>
              <input type="text" 
                placeholder="Street" 
                id="customer_address_street" 
                required 
                value={ customerName } 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerName(e.target.value) } } 
                className="p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
              <input type="text" 
                placeholder="House No" 
                id="customer_address_houseno" 
                required 
                value={ customerName } 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerName(e.target.value) } } 
                className="p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
            </form>
          </div>
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
