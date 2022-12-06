import { useState } from 'react';
import type { ReactElement } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   currency: string;
   startValue?: number; 
}

export default function CurrencyInput({ currency, startValue = 0, ...props }: CurrencyInputProps): ReactElement {
  const [value, setValue] = useState<number>(0.0);

  const formatValue = (value: string | number): string => '0';
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.selectionStart)
  }
  return (
    <div className="relative flex items-center mb-4">
      <input
        type="text"
        {...props}
        value={formatValue(value)}
        inputMode="numeric"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e)}
        className="h-10 w-full p-2 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
      <span className="absolute w-1/6 text-center right-0 p-2 w-h-10 rounded-r-md bg-neutral-200 dark:bg-neutral-800">{currency}</span>
    </div>
  )
}