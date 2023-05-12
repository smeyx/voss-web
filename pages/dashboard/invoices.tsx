import React, { ChangeEvent, useState } from 'react';
import useSwr from 'swr';
import Dashboard from '@components/Dashboard/';
import Button from '@components/Button';
import fetchJSON from '@lib/fetchJSON';
import { protectedSsrPage } from '@lib/session'
import { Plus, Minus } from 'phosphor-react';
import PositionInput from '@components/Dashboard/Invoices/PositionInput';
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
  // const [ invoiceCustomerId, setInvoiceCustomerId ] = useState<string>('');
  // const [ invoiceName, setInvoiceName ] = useState<string>('');
  const [ invoiceDate, setInvoiceDate ] = useState<Date>(new Date());
  const [ positions, setPositions ] = useState<JSX.Element[]>(new Array())
  // const [ currency, setCurrency ] = useState<string>('€');
  const { data: response } = useSwr<CustomerApiResponse>(`/api/customer?user_id=${ user.id }`, fetchJSON);
  
  const addPosition = () => {
    const position = <PositionInput positionId={positions.length + 1} key={ positions.length + 1 } onHandleChange={ handlePositionChange } />;
    setPositions([...positions, position]);
  }

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  }
  //TODO: extract?
  if(positions.length === 0) addPosition();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const formData = new FormData(form);
    //loop throug formdata to validate inputs
    try {
      const response: { success: boolean } = await fetchJSON('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.success) {
        console.log(response);
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Dashboard user={ user } activeTab={ 'invoices' }>
      <>
        <nav>
          <Button 
            onClick={ () => setCreateInvoice(!createInvoice) } 
            className="font-bold">
            { !createInvoice ? <Plus size="16" className="mr-1" weight="bold" /> : <Minus size="16" className="mr-1" weight="bold" /> }
            New invoice
          </Button>
        </nav>
        <br />
        <div>{ 'this is the invoices view' }</div>
        <div className="p-4 mt-5 border rounded-md border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-900" >
          <h1 className="text-lg font-bold">Create a new invoice</h1>
          <form className="flex flex-col flex-1 mt-4 gap-2"
            onSubmit={ (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e) }>
            <div className="sm:grid sm:grid-cols-6 sm:gap-4 sm:gap-y-0">
              <div className="col-span-full">
                <label htmlFor="invoice_customer" className="block">Customer</label>
                <select 
                  name="invoice_customer" 
                  // onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceCustomerId(e.target.value)}
                  className="w-full h-10 px-4 py-2 mb-4 sm:w-auto bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                  {response?.data.customers && response.data.customers.map((c: Customer) => (<option value={c.id} key={c.id}>{c.name}</option>))}
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="invoice_customer" className="block">Invoice Name</label>
                <input type="text"
                  placeholder="Name"
                  id="invoice_name"
                  required
                  // value={invoiceName}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInvoiceName(e.target.value) }}
                  className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="invoice_date" className="block">Schedule invoice</label>
                <input type="date"
                  placeholder="Date"
                  id="invoice_date"
                  required
                  value={ invoiceDate.toISOString().substring(0, 10)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInvoiceDate(new Date(e.target.value)) }}
                  className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
              </div>
              <div className="col-span-full sm:col-span-3 mb-10">
                <label htmlFor="invoice_date_repeat" className="block">Schedule</label>
                <select
                  name="invoice_date_schedule"
                  className="w-full h-10 px-4 py-2 mb-4 border bg-clip-padding bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                  { ['once', 'weekly', 'monthly', 'yearly'].map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              { positions && positions.map( (p, i) => p) }
              <div className="col-span-full text-right">
                <Button 
                  className="font-bold sm:w-auto sm:inline-flex"
                  onClick={ () => addPosition() }
                  type="button"
                  >Add position</Button>
              </div>
            </div>
            <div className="text-right mt-4">
              <Button
                type="button"
                className="w-full font-bold sm:w-auto sm:inline-flex sm:mr-4">Cancel</Button>
              <Button
                type="submit"
                className="w-full mt-4 font-bold sm:mt-0 sm:w-auto sm:inline-flex">Save</Button>
            </div>
          </form>
        </div>
    </>
    </Dashboard>
  );
}
export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Invoices;
