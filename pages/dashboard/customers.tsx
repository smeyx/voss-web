import { useState, useMemo } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session/session';
import useCustomers from '@lib/customers/useCustomers';
import Dashboard from '@components/Dashboard/';
import NewCustomerForm from '@components/Dashboard/Customers/NewCustomerForm';
import Pagination from '@components/Pagination';
import Button from '@components/Button';
import LoadingAnimation from '@components/LoadingAnimation';
import fetchJSON from '@lib/fetchJSON';
import { Plus, Minus } from 'phosphor-react';
import type { User } from '@models/user'
import type { NextPage, GetServerSideProps } from 'next/types';
import GenericList from '@components/GenericList';

interface PageProps {
  user: User,
}

const Customers: NextPage<PageProps> = ({ user }) => {
  const [ currentPage, setCurrentPage] = useState<number>(1);
  const [ pageSize, setPageSize] = useState<number>(10);
  const [ createCustomer, setCreateCustomer ] = useState<boolean>(false);
  const [ requestLoading, setRequestLoading ] = useState<boolean>(false);
  const [ requestSuccessful, setRequestSuccessful ] = useState<boolean>(false);

  const { 
    customers,
    count,
    mutateCustomers,
    isLoading,
  } = useCustomers(user.id);
  
  async function submitCustomerForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const name = event.currentTarget.customer_name.value;
      const email = event.currentTarget.customer_email.value;
      const street = event.currentTarget.customer_address_street.value;
      const housenumber = event.currentTarget.customer_address_houseno.value;
      const city = event.currentTarget.customer_address_city.value;
      const postalcode = event.currentTarget.customer_address_zipcode.value;

      setRequestLoading(true);
      const response: { success: boolean } = await fetchJSON('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, address: { street, housenumber, city, postalcode }, user_id: user.id,}),
      });
      
      setRequestLoading(false);

      if(response.success) {
        mutateCustomers();
        // setRequestSuccessful(true);
        setCreateCustomer(false);
      }
    } catch(error) {
      setRequestSuccessful(false);
      console.log(error);
    }
  }
  
  return (
    <Dashboard title="Customers" user={ user } activeTab={ 'customers' }>
      <>
        <section>
          <Button 
            onClick={ () => setCreateCustomer(!createCustomer) } 
            title="Create a new customer"
            >
            { !createCustomer ? <Plus size="16" className="mr-1" /> : <Minus size="16" className="mr-1" /> }
            Create customer
          </Button>
        </section>
          { !customers && isLoading && <LoadingAnimation className="mt-10"/>}
          { !createCustomer && customers ? (
            <GenericList
              items={customers}
              renderItem={
                (c) => (
                  <li key={c.id} className="p-2 mb-1 border bg-neutral-100 shadow-sm rounded-md border-neutral-200 dark:border dark:border-neutral-800 dark:bg-neutral-700">
                    <div className="grid grid-cols-2 lg:grid-cols-5">
                      <div className="col-span-1 lg:col-span-2">
                        {c.name}
                      </div>
                      <div className="col-span-1 lg:col-span-3">
                        <div className="flex flex-col lg:grid lg:grid-cols-8 gap-2 break-all">
                          <span className="w-3/8 lg:col-span-4">{c.address.street} {c.address.housenumber}</span>
                          <span className="w-2/8 lg:col-span-2">{c.address.postalcode}</span>
                          <span className="w-3/8 lg:col-span-2">{c.address.city}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }
            >
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} listLength={ count || 0 } />
            </GenericList>
          ) : null }
        

        { createCustomer && 
          <NewCustomerForm
            requestLoading={ requestLoading }
            requestSuccessful={ requestSuccessful }
            key={+createCustomer}
            submitCustomerForm={submitCustomerForm}
            clearCustomerForm={() => setCreateCustomer(!createCustomer)} />
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
