import { useState } from 'react';
import type { ReactElement } from 'react';

interface newCustomerFormProps {
  submitCustomerForm: (event: React.FormEvent<HTMLFormElement>) => void,
  clearCustomerForm: () => void
}
const NewCustomerForm: React.FC<newCustomerFormProps> = ({ submitCustomerForm, clearCustomerForm}): ReactElement => {
  const [ customerEmail, setCustomerEmail ] = useState<string>('');
  const [ customerName, setCustomerName ] = useState<string>('');
  const [ customerStreet, setCustomerStreet ] = useState<string>('');
  const [ customerHouseNo, setCustomerHouseNo ] = useState<string>('');
  const [ customerZipCode, setCustomerZipCode ] = useState<string>('');
  const [ customerCity, setCustomerCity ] = useState<string>('');

  return (
    <div className="p-4 mt-5 border rounded-md border-neutral-200 bg-neutral-100 dark:bg-neutral-700 dark:border-neutral-800" >
      <h1 className="text-lg font-bold">Create a new customer</h1>
      <form 
        onSubmit={ submitCustomerForm }
        className="flex flex-col flex-1 mt-4 gap-2">
        <div className="md:grid md:grid-cols-6 gap-4">
          <div className="col-span-full">
            <label className="block" htmlFor="customer_name">Name</label>
            <input type="text" 
              placeholder="Name" 
              id="customer_name" 
              required 
              value={ customerName } 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerName(e.target.value) } } 
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
          </div>
          <div className="col-span-full">
            <label className="block" htmlFor="customer_email">E-Mail</label>
            <input type="email" 
              placeholder="E-Mail" 
              id="customer_email" 
              required 
              value={ customerEmail } 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerEmail(e.target.value) } } 
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
          </div>
          <div className="col-span-4">
            <label htmlFor="customer_address_street" className="block">Street</label>
            <input type="text" 
              placeholder="Street" 
              id="customer_address_street" 
              required 
              value={ customerStreet } 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerStreet(e.target.value) } } 
              className="w-full p-2 mb-4 mr-2 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
          </div>
          <div className="col-span-2">
            <label htmlFor="customer_address_houseno" className="block">House number</label>
            <input type="text" 
              placeholder="House number" 
              id="customer_address_houseno" 
              required 
              value={ customerHouseNo } 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerHouseNo(e.target.value) } } 
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
          </div>
          <div className="col-span-2">
            <label htmlFor="customer_address_zipcode" className="block">ZIP / Postal code</label>
            <input type="text" 
              placeholder="Zip code" 
              id="customer_address_zipcode" 
              required 
              value={ customerZipCode }
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerZipCode(e.target.value) } } 
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
          </div>
          <div className="col-span-4">
            <label htmlFor="customer_address_city" className="block">City</label>
            <input type="text" 
              placeholder="City" 
              id="customer_address_city" 
              required 
              value={ customerCity }
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerCity(e.target.value) } } 
              className="w-full p-2 mb-4 mr-2 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
          </div>
        </div>
        <div className="text-right">
          <button 
            type="button" 
            onClick={ () => clearCustomerForm() }
            className="inline-flex items-center px-4 py-2 mr-4 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">Cancel</button>
          <button 
            type="submit" 
            className="inline-flex items-center px-4 py-2 font-bold text-white dark:text-neutral-800 bg-primary-500 dark:bg-secondary-500 hover:bg-primary-600 dark:hover:bg-secondary-600 rounded-md transition-colors">Save</button>
        </div>
      </form>
    </div>
  );
}

export default NewCustomerForm;
