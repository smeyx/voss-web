import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next/types';
import { protectedSsrPage } from '@lib/session'
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
          <button className="flex items-center px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 dark:bg-secondary-500 dark:hover:bg-secondary-600 transition-colors">
            <Plus size="16" className="mr-2" />
            Create invoice
          </button>
        </nav>
        <br />
        <div></div>
        <div>{ 'this is the invoices view' }</div>
      </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
