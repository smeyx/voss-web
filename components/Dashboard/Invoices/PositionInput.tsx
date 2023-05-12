import { ChangeEvent, useRef, useState } from 'react';
import Button from '@components/Button';
import CurrencyInput from '@components/CurrencyInput';
import { Trash } from 'phosphor-react';

interface PositionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency?: string;
  positionId: number;
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PositionInput: React.FC<PositionInputProps> = ({ currency = '€', onHandleChange, positionId }): JSX.Element => {
  const [ positionPrice, setPositionPrice ] = useState<number>(0.0);
  const positionRef = useRef<HTMLDivElement>(null);

  const removePosition = () => {
    positionRef.current?.remove();
  }

  return (
    <div ref={ positionRef } className="col-span-full lg:col-span-6 lg:grid lg:grid-cols-10 lg:gap-4 mb-10 lg:mb-0">
      <div className="col-span-full lg:col-span-6">
        <label htmlFor="invoice_position_name[]">Position</label>
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
      <div className="col-span-full lg:col-span-2">
        <label htmlFor="invoice_position_price[]">Price</label>
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
      <div className="col-span-full lg:col-span-1">
        <label htmlFor="invoice_position_amount[]">Amount</label>
        <input
          type="number"
          placeholder="1"
          required
          defaultValue={1}
          name="invoice_position_amount[]"
          className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white"
        />
      </div>
      <div className="col-span-full lg:col-span-1">
        <label>Remove</label>
        <Button
          name="remove_position[]"
          type="button"
          onClick={ () => removePosition() }
          className="block py-0 px-0 flex-initial mr-4 h-10 w-full mb-4"
        >
          <Trash />
        </Button>
      </div>
    </div>
  )
}

export default PositionInput