import { useState, useRef } from 'react';
import { GetServerSideProps, NextPage } from "next";
import Button from '@components/Button';
import useSWR from 'swr';
import { protectedSsrPage } from '@lib/session/session';
import fetchJSON from '@lib/fetchJSON';
import type { NumberRangeApiResponse } from '@api/settings/numbers';
import type { User } from '@models/user';
import type { NumberRange } from '@models/settings';
import LoadingAnimation from '@components/LoadingAnimation';
import useNumberRanges from '@lib/invoice/useNumberRanges';

//TODO: display success messages

interface PageProps {
  user: User
}

const Settings: NextPage<PageProps> = ({user}): JSX.Element => {
  const [ name, setName ] = useState<string>('');
  const [ prefix, setPrefix ] = useState<string>('');
  const [ currentNumber, setCurrentNumber ] = useState<number>(1);
  const [ numberLength, setNumberLength ] = useState<number>(6);
  const [ filler, setFiller ] = useState<string>('');
  const [ selectedRange, setSelectedRange ] = useState<number>(0);
  const [ requestLoading, setRequestLoading ] = useState<boolean>(false);
  const [ requestSuccessful, setRequestSuccessful ] = useState<boolean>(false);
  
  const {
    numberRanges,
    mutateNumbers: mutateNumberRanges,
  } = useNumberRanges(user.id);
  
  const resetForm = () => {
    setName('');
    setPrefix('');
    setCurrentNumber(1);
    setNumberLength(6);
    setFiller('');
  }

  const handleNumberRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId: number = parseInt(event.currentTarget.value);
    setSelectedRange(selectedId);

    if (selectedId == 0) {
        resetForm();
    } else {
      if (numberRanges) {
        let range = numberRanges.find((n: NumberRange) => n.id == selectedId);
        if (range) {
          setName(range.name);
          setPrefix(range.prefix);
          setCurrentNumber(range.currentNumber);
          setNumberLength(range.numberLength);
          setFiller(range.filler);
        }
      }
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      let newNumberRange = {
        id: selectedRange,
        name,
        prefix,
        current_number: currentNumber,
        number_length: numberLength,
        filler,
        user_id: user.id,
      }
      
      setRequestLoading(true);
      
      const method = selectedRange == 0 ? 'POST' : 'PATCH';
      const response: { success: boolean } = await fetchJSON('/api/settings/numbers', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNumberRange),
      });
      
      setRequestLoading(false);

      if(response && response.success) {
        // setRequestSuccessful(true);
        mutateNumberRanges();
        setSelectedRange(0);
        if(selectedRange == 0) {
          resetForm();
        }
        // setTimeout(() => setRequestSuccessful(false), 1000);
      }
    } catch(error) {
      setRequestSuccessful(false);
      console.log(error);
    }
  }
  return (
    <section className="container mx-auto px-4 mt-10">
      <div className="p-4 mt-5 border rounded-md border-neutral-200 dark:border-neutral-900" >
        <h1 className="text-lg font-bold">Settings</h1>
        <section className="p-4 mt-5 border rounded-md border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-900" >
          <h2 className="font-bold mb-5">Invoice Number range</h2>
          {
            numberRanges && numberRanges.length > 0 ?
              <label>Number range
                <select
                  name="current_number_range"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { handleNumberRangeChange(e) }}
                  className="block w-full h-10 px-4 py-2 mb-4 sm:w-auto bg-neutral-200 focus:border focus:border-primary-500 dark:bg-neutral-600 rounded-md dark:focus:border dark:focus:border-secondary-500 dark:border dark:border-neutral-900"
                >
                  <option value="0" selected>New number range</option>
                  {
                    (numberRanges && numberRanges.length > 0) &&
                    numberRanges.map((n: NumberRange, i: number) => (
                      <option key={i} value={n.id}>
                        {n.name}
                      </option>)
                    )
                  }
                </select>
              </label>
              : null
          }
            <form
              className="flex flex-col flex-1 mt-4 gap-2"
              onSubmit={ (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e) }>
              <section className="md:grid md:grid-cols-6 gap-4">
                <div className="col-span-6">
                  <label className="block" htmlFor="name">Name</label>
                  <input type="text"
                    placeholder="Number range name"
                    id="name"
                    value={ name }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                    className="h-12 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
                </div>
                <div className="col-span-2 md:col-span-3 xl:col-span-2">
                  <label className="block" htmlFor="prefix">Number prefix</label>
                  <input type="text"
                    placeholder="Prefix used before invoice number"
                    id="prefix"
                    value={ prefix }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setPrefix(e.target.value)}
                    required
                    className="h-12 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
                </div>
                <div className="col-span-2 md:col-span-3 xl:col-span-2">
                  <label className="block" htmlFor="filler">Filler character</label>
                  <input type="text"
                    placeholder="Number range filler"
                    id="filler"
                    value={ filler }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setFiller(e.target.value)}
                    required
                    className="h-12 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
                </div>
                <div className="col-span-1 md:col-span-3 xl:col-span-1">
                  <label className="block" htmlFor="number_length">Length to fill up to</label>
                  <input type="number"
                    placeholder="Number length"
                    id="number_length"
                    value={ numberLength }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNumberLength(parseInt(e.target.value))}
                    required
                    className="h-12 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
                </div>
                <div className="col-span-1 md:col-span-3 xl:col-span-1">
                  <label className="block" htmlFor="current_number">Current number</label>
                  <input type="number"
                    placeholder="Current number"
                    id="current_number"
                    value={ currentNumber }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setCurrentNumber(parseInt(e.target.value))}
                    required
                    disabled={ selectedRange > 0 ? true : false }
                    readOnly
                    className="h-12 disabled:bg-neutral-200 dark:disabled:bg-neutral-700 hover:disabled:cursor-not-allowed w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
                </div>
                <div className="text-right col-span-full flex justify-end">
                  { requestLoading && <LoadingAnimation className="inline-flex self-center mr-4"/>}
                  <Button
                    type="submit"
                    className="grow-0"
                    >{ selectedRange === 0 ? 'Submit' : 'Save' }</Button>
                </div>
              </section>
            </form>
        </section>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = protectedSsrPage;
export default Settings;