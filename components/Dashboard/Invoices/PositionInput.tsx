import { ChangeEvent, useRef, useState } from 'react';
import Button from '@components/Button';
import CurrencyInput from '@components/CurrencyInput';
import { TrashSimple } from 'phosphor-react';
import { Position } from '@models/invoice/invoice.types';

interface PositionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency?: string;
  index: number;
  removePosition: (index: number) => void;
}

const PositionInput: React.FC<PositionInputProps> = ({
  currency = '€',
  index,
  removePosition
}): JSX.Element => {
  const [ positionPrice, setPositionPrice ] = useState<number>(0.0);
  // const positionRef = useRef<HTMLDivElement>(null);

  // const removePosition = () => {
  //   positionRef.current?.remove();
  // }

  return (
    <div className="col-span-full lg:col-span-6 lg:grid lg:grid-cols-10 lg:gap-4 mb-10 lg:mb-0">
      <div className="col-span-full lg:col-span-6">
        <label>Position
        <input
          type="text"
          placeholder="Name of the position"
          name={`position_name_${index}`}
          autoComplete="off"
          required
          className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white"
        />
    </label>
      </div>
      <div className="col-span-full lg:col-span-2">
        <label>
          Price
          <CurrencyInput
            currency={currency}
            placeholder="Price per unit"
            name={`position_price_${ index }`}
            autoComplete="off"
            required
            startValue={positionPrice}
            setValue={setPositionPrice}
          />
        </label>
      </div>
      <div className="col-span-full lg:col-span-1">
        <label>Amount
          <input
            type="number"
            placeholder="1"
            required
            defaultValue={1}
            name={`position_amount_${ index }`}
            className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white"
          />
        </label>
      </div>
      {
        index !== 1 ?
          <div className="col-span-full lg:col-span-1">
            <label>Remove</label>
            <Button
              name={`remove_position_${ index }`}
              type="button"
              onClick={ () => removePosition(index) }
              className="block py-0 px-0 flex-initial mr-4 h-10 w-full mb-4"
              title="Remove position"
            >
              <TrashSimple focusable="false" weight="regular" size="20" className="hidden lg:block" />
              <span className="lg:hidden lg:mx-4">Remove position</span>
            </Button>
          </div>
          : null
      }
    </div>
  )
}

export default PositionInput