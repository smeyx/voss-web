import React, { useState } from 'react';
import useSwr, { SWRResponse } from 'swr';
import Dashboard from '@components/Dashboard/';
import Button from '@components/Button';
import fetchJSON from '@lib/fetchJSON';
import { formToInvoice } from '@lib/invoice/';
import { protectedSsrPage } from '@lib/session/session'
import { Plus, Minus } from 'phosphor-react';
import NewInvoiceForm from '@components/Dashboard/Invoices/NewInvoiceForm';
import LoadingAnimation from '@components/LoadingAnimation';
import Pagination from '@components/Pagination';
import GenericList from '@components/GenericList';
import type { NextPage, GetServerSideProps } from 'next/types';
import type { User } from '@models/user/';
import type { NumberRangeApiResponse } from '@pages/api/settings/numbers';
import type { InvoiceApiResponse } from '@pages/api/invoices';
import useCustomers from '@lib/customers/useCustomers';
import useNumberRanges from '@lib/invoice/useNumberRanges';

interface PageProps {
  user: User,
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

  const {
    customers,
    count,
    isLoading: customersLoading
  } = useCustomers(user.id);
  
  const {
    numberRanges,
  } = useNumberRanges(user.id);
  console.log(numberRanges)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    let formData = new FormData(form);
    formData.append('user_id', user.id.toString());

    try {
      formData = formToInvoice(formData);
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
          customers && 
          numberRanges ? 
            <NewInvoiceForm
              submitInvoiceForm={handleSubmit}
              clearInvoiceForm={() => setCreateInvoice(false)}
              customers={customers}
              customersLoading={customersLoading}
              customerCount={count || 0}
              numberRanges={numberRanges}
            />
            : null
        }
          { !invoiceData && <LoadingAnimation className="mt-10"/>}
          { !createInvoice && invoiceData?.success && customers && (
            <GenericList
              items={invoiceData.invoices}
              renderItem={(invoice) => (
                <li key={invoice.id} className="p-2 mb-1 border bg-neutral-100 shadow-sm rounded-md border-neutral-200 dark:border dark:border-neutral-800 dark:bg-neutral-700">
                  <div className="grid grid-cols-2 lg:grid-cols-5">
                    <div className="col-span-1 lg:col-span-3">
                      { invoice.name }
                    </div>
                      {
                        customers.filter(c => c.id === invoice.customerId).map((c) => {
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
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} listLength={invoiceData.count} />
            </GenericList>
          )}
    </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
