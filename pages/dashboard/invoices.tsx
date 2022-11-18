import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next/types';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import Dashboard from '@components/Dashboard/';
import { Plus } from 'phosphor-react';
import type { User } from '@models/user/user.types';

interface PageProps {
  user: User,
}

const Invoices: NextPage<PageProps> = ({ user }) => {
  const [ newInvoice, setNewInvoice] = useState<boolean>(false);

  return (
    <Dashboard user={ user } activeTab={ 'invoices' }>
      <>
        <nav>
          <button 
            onClick={ () => setNewInvoice(!newInvoice) }
            className="flex items-center px-4 py-2 font-bold dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">
            <Plus size="16" className="mr-1" weight="bold"/>
            New invoice
          </button>
        </nav>
        { !newInvoice && 
          <div>{ 'this is the invoices view' }</div>
        }

        { newInvoice && 
          <div className="p-4 mt-10 rounded-md bg-neutral-100 dark:bg-neutral-700" >
            <form className="flex flex-col flex-1 gap-2">
              <label htmlFor="select_customer">Customer</label>
              <select id="select_customer" className="px-4 py-2 bg-neutral-600 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
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

export default Invoices;
