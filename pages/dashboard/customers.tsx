import { useState, useEffect } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import Dashboard from '@components/Dashboard/';
import NewCustomerForm from '@components/NewCustomerForm';
import fetchJSON from '@lib/fetchJSON';
import useSwr from 'swr';
import { Plus } from 'phosphor-react';
import type { Customer } from '@models/customer';
import type { User } from '@models/user'
import type { NextPage, GetServerSideProps } from 'next/types';

interface PageProps {
  user: User,
}

interface CustomerResponse {
  success: string,
  customers: Customer[]
}

const Customers: NextPage<PageProps> = ({ user }) => {
  const [ createCustomer, setCreateCustomer ] = useState<boolean>(false);
  const { data, mutate: mutateCustomers } = useSwr<CustomerResponse>('/api/customer', fetchJSON)
  let customerList;

  if(data && data.customers && data.customers.length > 0) {
    customerList = data.customers.map((c: Customer) => {
      return (
        <div key={ c.id } className="bg-neutral-100 shadow-sm p-4 rounded-md mb-1 border-neutral-200 border">
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              {c.name}
            </div>
            <div className="col-span-1">
              <div className="flex flex-col">
                <p>{c.address.street}{' '}{c.address.housenumber}</p>
                <p>{c.address.postalcode}{' '}{c.address.city}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  async function submitCustomerForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const name = event.currentTarget.customer_name.value;
      const email = event.currentTarget.customer_email.value;
      const street = event.currentTarget.customer_address_street.value;
      const housenumber = event.currentTarget.customer_address_houseno.value;
      const city = event.currentTarget.customer_address_city.value;
      const postalcode = event.currentTarget.customer_address_zipcode.value;

      const response: { success: boolean } = await fetchJSON('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, address: { street, housenumber, city, postalcode } }),
      });

      if(response.success) {
        mutateCustomers();
        setCreateCustomer(false);
      }
    } catch(error) {
      console.log(error);
    }
  }

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
        { /*TODO: make it beautiful and extract it*/ }
        { !createCustomer && customerList }
        

        { createCustomer && 
          <NewCustomerForm 
          key={ +createCustomer }
            submitCustomerForm={ submitCustomerForm }
            clearCustomerForm={ () => setCreateCustomer(!createCustomer) }/>
        }
        </>
    </Dashboard>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    if(!req.session || !req.session.user) {
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
