import { useState } from 'react';
import useSwr from 'swr';
import Dashboard from '@components/Dashboard/';
import fetchJSON from '@lib/fetchJSON';
import { protectedSsrPage } from '@lib/session'
import { Plus, Minus } from 'phosphor-react';
import type { NextPage, GetServerSideProps } from 'next/types';
import type { User } from '@models/user/';
import type { Customer } from '@models/customer/';

interface PageProps {
  user: User,
}

interface CustomerApiResponse {
  success: boolean,
  data: CustomerResponse,
}

interface CustomerResponse {
  count: number,
  customers: Customer[]
}
const Invoices: NextPage<PageProps> = ({ user }) => {
  const [ createInvoice, setCreateInvoice] = useState<boolean>(false);
  const { data: response, mutate: mutateCustomers } = useSwr<CustomerApiResponse>(`/api/customer?user_id=${ user.id }`, fetchJSON);

  return (
    <Dashboard user={ user } activeTab={ 'invoices' }>
      <>
        <nav>
          <button 
            onClick={ () => setCreateInvoice(!createInvoice) } 
            className="flex items-center px-4 py-2 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">
            { !createInvoice ? <Plus size="16" className="mr-1" weight="bold" /> : <Minus size="16" className="mr-1" weight="bold" /> }
            New invoice
          </button>
        </nav>
        <br />
        <div></div>
        <div>{ 'this is the invoices view' }</div>
        <div>
          <select className="px-4 py-2 bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-700 rounded-md dark:focus:border dark:focus:border-secondary-500">
            { response?.data.customers && response.data.customers.map((c: Customer) => (<option key={c.id}>{c.name}</option>))}
          </select>
        </div>
      </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
