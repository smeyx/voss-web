import React, { ChangeEvent, useState } from 'react';
import useSwr, { SWRResponse } from 'swr';
import Dashboard from '@components/Dashboard/';
import Button from '@components/Button';
import fetchJSON from '@lib/fetchJSON';
import { protectedSsrPage } from '@lib/session'
import { Plus, Minus } from 'phosphor-react';
import ErrorMessage from '@components/ErrorMessage';
import { Position } from '@models/invoice/invoice.types';
import NewInvoiceForm from '@components/Dashboard/Invoices/NewInvoiceForm';
import type { NextPage, GetServerSideProps } from 'next/types';
import type { User } from '@models/user/';
import type { Customer } from '@models/customer/';
import type { NumberRangeApiResponse } from '@pages/api/settings/numbers';
import type { InvoiceApiResponse } from '@pages/api/invoices';
import LoadingAnimation from '@components/LoadingAnimation';
import CustomerList from '@components/Dashboard/Customers/CustomerList';
import Pagination from '@components/Pagination';
import GenericList from '@components/GenericList';

interface PageProps {
  user: User,
}

interface CustomerApiResponse extends SWRResponse {
  success: boolean,
  data: CustomerResponse,
}

interface CustomerResponse {
  count: number,
  customers: Customer[]
}

const Invoices: NextPage<PageProps> = ({ user }) => {
  const [ currentPage, setCurrentPage] = useState<number>(1);
  const [ pageSize, setPageSize] = useState<number>(10);
  const [ createInvoice, setCreateInvoice] = useState<boolean>(false);
  const [ requestLoading, setRequestLoading ] = useState<boolean>(false);
  const [ requestSuccessful, setRequestSuccessful ] = useState<boolean>(false);

  const { data: invoiceData, mutate: mutateInvoices, isLoading: invoicesLoading } = useSwr(
    `/api/invoices?user_id=${ user.id }&page=${ currentPage }&size=${ pageSize }`,
    fetchJSON<InvoiceApiResponse>
  )
  const { data: customerData, isLoading: customersLoading } = useSwr(`/api/customers?user_id=${ user.id }`, fetchJSON<CustomerApiResponse>);
  const { data: numberRanges } = useSwr(`/api/settings/numbers?user_id=${ user.id }`, fetchJSON<Partial<NumberRangeApiResponse>>)
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const formData = new FormData(form);
    formData.append('user_id', user.id.toString());
    
    //TODO: loop throug formdata to validate inputs
    const positions:Array<Position> = [];
    const deleteEntries: Array<string> = [];
    const entries = formData.entries();
    let element = entries.next();
    while(!element.done) {
      const [k, v] = element.value;
      //just to make it overly complicated
      // move positions into their own object
      if (k.includes('position')) {
        const parts = k.split('_');
        if (parts) {
          let index = parts.pop();
          const field = parts.pop();


          if (index && field) {
            let numIndex: number = parseInt(index);
            if (!positions[numIndex]) {
               positions[numIndex] = {
                name: '',
                price: '',
                amount: 0,
              } as Position;
            }

          }

          positions[index][field] = v;
        }
        
        deleteEntries.push(k);
      }
      
      element = entries.next();
    }
    
    // delete unnecessary positions from formdata.
    for(let i of deleteEntries) formData.delete(i);
    formData.append('positions', JSON.stringify(positions));

    try {
      setRequestLoading(true);
      const response: { success: boolean } = await fetchJSON('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      setRequestLoading(false);

      if (response.success) {
        // setRequestSuccessful(true);
        mutateInvoices();
        setCreateInvoice(false);
      } else {
        setRequestSuccessful(false);
        throw new Error('Request unsuccessful.')
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Dashboard title="Invoices" user={ user } activeTab={ 'invoices' }>
      <>
        <section>
          <Button 
            onClick={ () => setCreateInvoice(!createInvoice) } 
            title="Create a new invoice"
            >
            { !createInvoice ? <Plus size="16" className="mr-1" /> : <Minus size="16" className="mr-1" /> }
            Create invoice
          </Button>
        </section>
        {
          createInvoice && 
          customerData?.data.customers && 
          numberRanges?.data ?
            <NewInvoiceForm
              submitInvoiceForm={handleSubmit}
              clearInvoiceForm={() => setCreateInvoice(false)}
              customers={customerData.data.customers}
              customersLoading={customersLoading}
              customerCount={customerData.data.count}
              numberRanges={numberRanges.data}
            />
            : null
        }
          { !customerData && <LoadingAnimation className="mt-10"/>}
          { !createInvoice && invoiceData && invoiceData.success === true && (
            <GenericList
              items={invoiceData.data.invoices}
              renderItem={(invoice) => (
                <li key={invoice.id} className="p-2 mb-1 border bg-neutral-100 shadow-sm rounded-md border-neutral-200 dark:border dark:border-neutral-800 dark:bg-neutral-700">
                  <div className="grid grid-cols-2 lg:grid-cols-5">
                    <div className="col-span-1 lg:col-span-3">
                      { invoice.name }
                    </div>
                      {
                        customerData?.data.customers.filter(c => c.id === invoice.customerId).map((c) => {
                          if (c.id === invoice.customerId) {
                            return (
                              <div
                                key={c.id}
                                className="col-span-1 lg:col-span-2"
                              >
                                {c.name}
                              </div>
                            )
                          }
                        })
                      }
                  </div>
                </li>
              )}
            >
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} listLength={invoiceData.data.count} />
            </GenericList>
          )}
    </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
