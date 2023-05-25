import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import useSwr, { SWRResponse } from 'swr';
import Dashboard from '@components/Dashboard/';
import Button from '@components/Button';
import fetchJSON from '@lib/fetchJSON';
import { protectedSsrPage } from '@lib/session'
import { Plus, Minus } from 'phosphor-react';
import PositionInput from '@components/Dashboard/Invoices/PositionInput';
import type { NextPage, GetServerSideProps } from 'next/types';
import type { User } from '@models/user/';
import type { Customer } from '@models/customer/';
import type { NumberRangeApiResponse } from '@pages/api/settings/numbers';
import ErrorMessage from '@components/ErrorMessage';
import { NumberRangeDb } from '@models/settings';

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
  const [ createInvoice, setCreateInvoice] = useState<boolean>(false);
  // const [ invoiceCustomerId, setInvoiceCustomerId ] = useState<string>('');
  // const [ invoiceName, setInvoiceName ] = useState<string>('');
  // const [ currency, setCurrency ] = useState<string>('€');
  const [ requestLoading, setRequestLoading ] = useState<boolean>(false);
  const [ requestSuccessful, setRequestSuccessful ] = useState<boolean>(false);
  const [ invoiceDate, setInvoiceDate ] = useState<Date>(new Date());
  const [ positions, setPositions ] = useState<JSX.Element[]>(new Array())
  const { data: customers, isLoading: customersLoading } = useSwr(`/api/customer?user_id=${ user.id }`, fetchJSON<CustomerApiResponse>);
  const { data: numberRanges } = useSwr(`/api/settings/numbers?user_id=${ user.id }`, fetchJSON<Partial<NumberRangeApiResponse>>)
  
  const addPosition = () => {
    const position = <PositionInput key={ positions.length + 1 } />;
    setPositions([...positions, position]);
  }

  //TODO: extract?
  if(positions.length === 0) addPosition();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const formData = new FormData(form);
    formData.append('user_id', user.id.toString());
    //TODO: loop throug formdata to validate inputs

    try {
      setRequestLoading(true);
      const response: { success: boolean } = await fetchJSON('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      setRequestLoading(false);

      if (response.success) {
        // setRequestSuccessful(true);
        console.log(response);
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
        <br />
        <div className="p-4 mt-5 border rounded-md border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-900" >
          <h1 className="text-lg font-bold">Create a new invoice</h1>
          {
            (customers?.data.customers && customers.data.customers.length > 0) ?
              <form className="flex flex-col flex-1 mt-4 gap-2"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <div className="sm:grid sm:grid-cols-6 sm:gap-4 sm:gap-y-0">
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="invoice_customer" className="block">Customer</label>
                    <select
                      name="invoice_customer"
                      id="invoice_customer"
                      required
                      // onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceCustomerId(e.target.value)}
                      className="w-full h-10 px-4 py-2 mb-4 bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                      {customers?.data.customers && customers.data.customers.map((c: Customer) => (<option value={c.id} key={c.id}>{c.name}</option>))}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="number_range" className="block">Number range</label>
                    <select
                      name="number_range"
                      id="number_range"
                      required
                      // onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceCustomerId(e.target.value)}
                      className="w-full h-10 px-4 py-2 mb-4 bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                      {numberRanges?.data && numberRanges.data.map((n: NumberRangeDb) => (<option value={n.id} key={n.id}>{n.name}</option>))}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="invoice_date" className="block">Schedule invoice</label>
                    <input type="date"
                      placeholder="Date"
                      id="invoice_date"
                      name="invoice_date"
                      defaultValue={new Date().toISOString().substring(0, 10)}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInvoiceDate(new Date(e.target.value)) }}
                      className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="invoice_date_schedule" className="block">Schedule</label>
                    <select
                      name="invoice_date_schedule"
                      id="invoice_date_schedule"
                      className="w-full h-10 px-4 py-2 mb-4 border bg-clip-padding bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                      {['once', 'weekly', 'monthly', 'yearly'].map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3 flex items-center mb-10">
                    <label className="hover:cursor-pointer flex items-center w-full justify-center bg-neutral-200 dark:bg-neutral-600 rounded-md border h-10 border-neutral-200 dark:border-neutral-900">
                      <input type="checkbox"
                        id="invoice_no_vat"
                        name="invoice_no_vat"
                        value="1"
                        className="mr-4 h-4 w-4 border text-primary-500 dark:text-secondary-500 border-primary-500 dark:border-secondary-500 focus:outline outline-1 outline-primary-500 dark:outline-secondary-500" />
                      No VAT clause (§ 19 UStG)
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="invoice_name" className="block">Invoice name</label>
                    <input type="text"
                      placeholder="The name of this invoice in our system."
                      id="invoice_name"
                      name="invoice_name"
                      required
                      className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="invoice_title" className="block">Invoice title</label>
                    <input type="text"
                      placeholder="This title will show in your invoice."
                      id="invoice_title"
                      name="invoice_title"
                      required
                      className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="invoice_subtext" className="block">Invoice subtext</label>
                    <textarea 
                      placeholder="This text will show below your invoice positions."
                      id="invoice_subtext"
                      name="invoice_subtext"
                      className="w-full h-40 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  {positions && positions.map((p, i) => p)}
                  <div className="col-span-full text-right mb-10">
                    <Button
                      className="w-full sm:w-auto sm:inline-flex"
                      onClick={() => addPosition()}
                      type="button"
                      title="Add position"
                    >Add position</Button>
                  </div>
                </div>
                <div className="text-right mt-4">
                  <Button
                    type="button"
                    title="Cancel creation"
                    className="w-full sm:w-auto sm:inline-flex sm:mr-4">Cancel</Button>
                  <Button
                    type="submit"
                    title="Submit form"
                    className="w-full mt-4 sm:mt-0 sm:w-auto sm:inline-flex font-bold">Submit</Button>
                </div>
              </form>
              : (!customersLoading && customers?.data.count === 0) ? (
                <ErrorMessage className="px-4 mt-5">
                  There are no customers. Please create a {' '}
                  <Link href='/dashboard/customers' title="Create customer in CRM">
                    customer
                  </Link>
                  {' '}
                  first.
                </ErrorMessage>
              )
                : null
          }
        </div>
    </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
