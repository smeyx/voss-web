import { ChangeEvent, useState } from 'react';
import CurrencyInput from '@components/CurrencyInput';

interface PositionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency?: string;
  positionId: number;
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


const PositionInput: React.FC<PositionInputProps> = ({ currency = '€', onHandleChange, positionId }): JSX.Element => {
  const [ positionPrice, setPositionPrice ] = useState<number>(0.0);
  return (
    <div className="col-span-full sm:col-span-6 sm:grid sm:grid-cols-10 sm:gap-4">
      <div className="col-span-full sm:col-span-7">
        <label htmlFor="invoice_position_name">Position</label>
        <input
          id={ `position-name-${positionId}` }
          type="text"
          placeholder="Name"
          name="invoice_position_name[]"
          autoComplete="off"
          required
          className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white"
        />
      </div>
      <div className="col-span-full sm:col-span-2">
        <label htmlFor="invoice_position_price">Price</label>
        <CurrencyInput
          currency={currency}
          placeholder="Price"
          name="invoice_position_price[]"
          autoComplete="off"
          required
          startValue={positionPrice}
          setValue={setPositionPrice}
        />
      </div>
      <div className="col-span-full sm:col-span-1">
        <label htmlFor="invoice_position_price">Amount</label>
        <input
          type="number"
          placeholder="1"
          required
          defaultValue={1}
          name="invoice_position_amount[]"
          className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white"
        />
      </div>
    </div>
  )
}

export default PositionInput