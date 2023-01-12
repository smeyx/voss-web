import { useState } from 'react';
import type { ReactElement } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency: string;
  startValue?: number;
  setValue?: (value: number) => void
}

export default function CurrencyInput({ currency, startValue = 0.0, setValue, ...props }: CurrencyInputProps): ReactElement {
  const [rawValue, setRawValue] = useState<number>(startValue);
  // const [ formattedValue, setFormattedValue ] = useState<string>(startValue)

  const formatValue = (value: number): string => {
    const formattedValue = Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(value ? value : 0)
    return formattedValue;
  };
  
  const cleanValue = (value: string): number => {
    if(!value) return 0.0;
    return parseFloat(value.replaceAll(/\D/g, ''));
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldSelection = e.currentTarget.selectionStart;
    const direction = e.currentTarget.selectionDirection;

    setRawValue(cleanValue(e.currentTarget.value));
    if (oldSelection) {
      e.currentTarget.setSelectionRange(oldSelection, oldSelection);
      e.currentTarget.focus();
    }

    console.log('raw', rawValue);
    console.log('format', formatValue(rawValue));
    console.log('selection start', oldSelection)
    console.log('selection direction', direction)
  }
  return (
    <div className="relative flex items-center mb-4">
      <input
        type="text"
        value={ formatValue(rawValue) }
        {...props}
        inputMode="numeric"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e)}
        className="h-10 w-full p-2 border border-neutral-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
      <span className="absolute w-1/6 text-center right-0 p-2 w-h-10 rounded-r-md bg-neutral-200 dark:bg-neutral-900">{currency}</span>
    </div>
  )
}