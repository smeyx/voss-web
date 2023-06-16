import Link from 'next/link';
import Button from '@components/Button';
import type { ReactElement } from 'react';
import { useState } from 'react';
import PositionInput from '@components/Dashboard/Invoices/PositionInput';
import ErrorMessage from '@components/ErrorMessage';
import type { NumberRange } from '@models/settings';
import type { Customer } from '@models/customer';

interface newInvoiceFormProps {
  requestLoading?: boolean,
  requestSuccessful?: boolean,
  submitInvoiceForm: (event: React.FormEvent<HTMLFormElement>) => void,
  clearInvoiceForm: () => void,
  customers: Customer[],
  numberRanges: NumberRange[]
  customersLoading: boolean,
  customerCount: number,
}
const NewInvoiceForm: React.FC<newInvoiceFormProps> = ({
  requestLoading,
  requestSuccessful,
  submitInvoiceForm,
  clearInvoiceForm,
  customers,
  numberRanges,
  customersLoading,
  customerCount,
}): ReactElement => {
  //TODO: seems odd
  const [ positions, setPositions ] = useState<Array<number>>([1]);
  const [ recurring, setRecurring ] = useState<boolean>(false);

  const addPosition = () => {
    setPositions([...positions, positions.length + 1]);
  }
  
  const removePosition = (index: number) => setPositions(positions.filter((v, i) => v !== index));

  return (
        <div className="p-4 mt-5 border rounded-md border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-900" >
          <h1 className="text-lg font-bold">Create a new invoice</h1>
          {
            (customers && customers.length > 0) ?
              <form className="flex flex-col flex-1 mt-4 gap-2"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitInvoiceForm(e)}>
                <div className="sm:grid sm:grid-cols-6 sm:gap-4 sm:gap-y-0">
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="customer" className="block">Customer</label>
                    <select
                      name="customer"
                      id="customer"
                      required
                      // onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceCustomerId(e.target.value)}
                      className="w-full h-10 px-4 py-2 mb-4 bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                      {customers && customers.map((c: Customer) => (<option value={c.id} key={c.id}>{c.name}</option>))}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="number_range_id" className="block">Number range</label>
                    <select
                      name="number_range_id"
                      id="number_range_id"
                      required
                      // onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceCustomerId(e.target.value)}
                      className="w-full h-10 px-4 py-2 mb-4 bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                      {numberRanges && numberRanges.map((n: NumberRange) => (<option value={n.id} key={n.id}>{n.name}</option>))}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="date" className="block">Schedule invoice</label>
                    <input type="date"
                      placeholder="Date"
                      id="date"
                      name="date"
                      defaultValue={new Date().toISOString().substring(0, 10)}
                      required
                      className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <label htmlFor="recurring" className="block">
                      Recurring
                    </label>
                    <div className="flex items-center h-10">
                      <input type="checkbox"
                        id="recurring"
                        name="recurring"
                        value="1"
                        onChange={() => setRecurring(!recurring)}
                        className="mr-4 h-4 w-4 border text-primary-500 dark:text-secondary-500 border-primary-500 dark:border-secondary-500 focus:outline outline-1 outline-primary-500 dark:outline-secondary-500" />
                    </div>
                  </div>
                  {
                    recurring ?
                      <div className="col-span-full sm:col-span-2">
                        <label htmlFor="schedule_option" className="block">Schedule</label>
                        <select
                          name="schedule_option"
                          id="schedule_option"
                          className="w-full h-10 px-4 py-2 mb-4 border bg-clip-padding bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900">
                          {['weekly', 'monthly', 'yearly'].map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                      </div>
                      : null
                  }
                  <div className="col-span-full sm:col-span-3 flex items-center mb-10">
                    <label className="hover:cursor-pointer flex items-center w-full justify-center bg-neutral-200 dark:bg-neutral-600 rounded-md border h-10 border-neutral-200 dark:border-neutral-900">
                      <input type="checkbox"
                        id="no_vat"
                        name="no_vat"
                        value="1"
                        className="mr-4 h-4 w-4 border text-primary-500 dark:text-secondary-500 border-primary-500 dark:border-secondary-500 focus:outline outline-1 outline-primary-500 dark:outline-secondary-500" />
                      No VAT clause (§ 19 UStG)
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="name" className="block">Invoice name</label>
                    <input type="text"
                      placeholder="The name of this invoice in our system."
                      id="name"
                      name="name"
                      required
                      className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="title" className="block">Invoice title</label>
                    <input type="text"
                      placeholder="This title will show in your invoice."
                      id="title"
                      name="title"
                      required
                      className="w-full h-10 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="subtext" className="block">Invoice subtext</label>
                    <textarea 
                      placeholder="This text will show below your invoice positions."
                      id="subtext"
                      name="subtext"
                      className="w-full h-40 p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
                  </div>
                  {
                    positions && positions.map((v, i) => (
                      <PositionInput
                        key={v}
                        index={v}
                        removePosition={ removePosition }
                      />
                    ))
                  }
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
                    onClick={ () => clearInvoiceForm() }
                    className="w-full sm:w-auto sm:inline-flex sm:mr-4">Cancel</Button>
                  <Button
                    type="submit"
                    title="Submit form"
                    className="w-full mt-4 sm:mt-0 sm:w-auto sm:inline-flex font-bold">Submit</Button>
                </div>
              </form>
              : (!customersLoading && customerCount === 0) ? (
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
  );
}

export default NewInvoiceForm;
