import React, { useState } from 'react';
import useSwr from 'swr';
import Dashboard from '@components/Dashboard/';
import Button from '@components/Button';
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
  const [ invoiceCustomerId, setInvoiceCustomerId ] = useState<string>('');
  const [ invoiceName, setInvoiceName ] = useState<string>('');
  const [ invoiceDate, setInvoiceDate ] = useState<Date>(new Date());
  const [ positionPrice, setPositionPrice ] = useState<string>('0.0');
  const { data: response, mutate: mutateCustomers } = useSwr<CustomerApiResponse>(`/api/customer?user_id=${ user.id }`, fetchJSON);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let price = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).formatToParts(e.currentTarget.value);
    console.log(price);
    // e.currentTarget.value = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR'}).format(parseFloat(price)) 
    // setPositionPrice(price);
  };
  const handleSubmit = (event: React.FormEvent<SubmitEvent>): void => {
    event.preventDefault();
    console.log(event.currentTarget);
  }

  return (
    <Dashboard user={ user } activeTab={ 'invoices' }>
      <>
        <nav>
          <Button 
            onClick={ () => setCreateInvoice(!createInvoice) } 
            className="flex items-center px-4 py-2 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">
            { !createInvoice ? <Plus size="16" className="mr-1" weight="bold" /> : <Minus size="16" className="mr-1" weight="bold" /> }
            New invoice
          </Button>
        </nav>
        <br />
        <div>{ 'this is the invoices view' }</div>
        <div className="p-4 mt-5 border rounded-md border-neutral-200 bg-neutral-100 dark:bg-neutral-700 dark:border-neutral-800" >
          <h1 className="text-lg font-bold">Create a new invoice</h1>
          <form className="flex flex-col flex-1 mt-4 gap-2"
            onSubmit={ (e: React.FormEvent<SubmitEvent>) => handleSubmit(e) }>
            <div className="md:grid md:grid-cols-6 gap-4">
              <div className="col-span-full">
                <label htmlFor="invoice_customer" className="block">Customer { invoiceCustomerId }</label>
                <select 
                  name="invoice_customer" 
                  onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceCustomerId(e.target.value)}
                  className="h-10 px-4 py-2 bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-800">
                  {response?.data.customers && response.data.customers.map((c: Customer) => (<option value={c.id} key={c.id}>{c.name}</option>))}
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="invoice_customer" className="block">Invoice Name</label>
                <input type="text"
                  placeholder="Name"
                  id="invoice_name"
                  required
                  value={invoiceName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInvoiceName(e.target.value) }}
                  className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
              </div>
              <div className="col-span-3">
                <label htmlFor="invoice_date" className="block">Schedule invoice</label>
                <input type="date"
                  placeholder="Date"
                  id="invoice_date"
                  required
                  value={ invoiceDate.toISOString().substring(0, 10)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInvoiceDate(new Date(e.target.value)) }}
                  className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
              </div>
              <div className="col-span-3">
                <label htmlFor="invoice_date_repeat" className="block">Schedule</label>
                <select
                  name="invoice_date_schedule"
                  className="h-10 w-full px-4 py-2 bg-clip-padding border bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-800">
                  { ['weekly', 'monthly', 'yearly'].map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="col-span-4">
                <label htmlFor="invoice_position_name">Position</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="invoice_position_name[]"
                  autoComplete="off"
                  className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
              </div>
              <div className="col-span-2">
                <label htmlFor="invoice_position_price">Price</label>
                <input
                  type="text"
                  value={ Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseFloat(positionPrice)) }
                  placeholder="Price"
                  inputMode="numeric"
                  name="invoice_position_price[]"
                  autoComplete="off"
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e) }
                  // onBlur={ (e: React.FocusEvent<HTMLInputElement>) => setPositionPrice(handlePriceChange(e.currentTarget.value)) }
                  className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
              </div>
            </div>
            <div className="text-right">
              <Button
                type="button"
                className="inline-flex items-center px-4 py-2 mr-4 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">Cancel</Button>
              <Button
                type="submit"
                className="inline-flex items-center px-4 py-2 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">Save</Button>
            </div>
          </form>
        </div>
    </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
