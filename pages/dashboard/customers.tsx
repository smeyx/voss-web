import { useState } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import Dashboard from '@components/Dashboard/';
import NewCustomerForm from '@components/Dashboard/Customers/NewCustomerForm';
import CustomerList from '@components/Dashboard/Customers/CustomerList';
import Pagination from '@components/Pagination';
import Button from '@components/Button';
import LoadingAnimation from '@components/LoadingAnimation';
import fetchJSON from '@lib/fetchJSON';
import useSwr from 'swr';
import { Plus, Minus } from 'phosphor-react';
import type { Customer } from '@models/customer';
import type { User } from '@models/user'
import type { NextPage, GetServerSideProps } from 'next/types';

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

const Customers: NextPage<PageProps> = ({ user }) => {
  const [ currentPage, setCurrentPage] = useState<number>(1);
  const [ pageSize, setPageSize] = useState<number>(10);
  const [ createCustomer, setCreateCustomer ] = useState<boolean>(false);
  const [ requestLoading, setRequestLoading ] = useState<boolean>(false);
  const [ requestSuccessful, setRequestSuccessful ] = useState<boolean>(false);

  const { data: response, mutate: mutateCustomers } = useSwr<CustomerApiResponse>(`/api/customer?user_id=${ user.id }&page=${ currentPage }&size=${ pageSize }`, fetchJSON);

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
      const response: { success: boolean } = await fetchJSON('/api/customer', {
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
        { /*TODO: make it beautiful and extract it*/ }
          { !response && <LoadingAnimation className="mt-10"/>}
          { !createCustomer && response && response.success === true && (
          <>
            <CustomerList customerList={response.data.customers}>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} listLength={response.data.count} />
            </CustomerList>
          </>
          )}
        

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
