import React, { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency: string;
  startValue?: number;
  decimalSeparator?: string,
  setValue?: (value: number) => void
}

export default function CurrencyInput({ 
  currency, 
  startValue = 0.0, 
  decimalSeparator = ',',
  setValue, 
  ...props 
}: CurrencyInputProps): ReactElement {
  const [rawValue, setRawValue] = useState<number>(startValue);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

  const formatValue = (value: number): string => {
    const formattedValue = formatter.format(value ? value : 0)
    return formattedValue;
  };
  
  const cleanValue = (value: string): number => {
    if(!value) return 0.0;
    const purgedValue = value.replaceAll('.', '').replaceAll(decimalSeparator, '.');
    return parseFloat(purgedValue);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const oldSelection: number = e.currentTarget.selectionStart || 0;

    const clean: number = cleanValue(value);
    setRawValue(clean);
    if (setValue) {
      setValue(clean);
    }
    
    //TODO: fix cursor shifting
    const cursorShift: number = ( formatValue(clean).length - value.length )
    const newCursorPosition = cursorShift > 0 ? cursorShift : 0;
    setCursorPosition(oldSelection);
  }
  
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  }

  useEffect(() => {
    if(
      inputRef &&
      inputRef.current &&
      document.activeElement === inputRef.current
      ) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
  }, [rawValue, cursorPosition])

  return (
    <div className="relative flex items-center mb-4">
      <input
        type="text"
        value={ formatValue(rawValue) }
        {...props}
        ref={ inputRef }
        inputMode="numeric"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e)}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(e)} 
        className="h-10 w-full p-2 border border-neutral-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
      { /* <span className="absolute w-1/6 text-center right-0 p-2 w-h-10 rounded-r-md bg-neutral-200 dark:bg-neutral-900">{currency}</span> */ }
    </div>
  )
}