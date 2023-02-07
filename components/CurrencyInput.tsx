import React, { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency: string;
  startValue?: number;
  decimalSeparator?: string,
  setValue?: (value: number) => void
}

//TODO: cleanup
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

  // extract to config?
  const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const formatValue = (value: number): string => {
    const formattedValue = formatter.format(value ? value : 0)
    return formattedValue;
  };
  
  const cleanValue = (value: string): number => {
    if(!value) return 0.0;
    //TODO: groupSeparator as variable
    const purgedValue: string = value.replaceAll('.', '').replaceAll(decimalSeparator, '.');

    // too much?
    let integerPart: string = '';
    let decimalPart: string = '';
    const parts = (formatter.formatToParts(parseFloat(purgedValue)));
    parts.map(p => {
      switch(p.type) {
        case 'integer': 
          integerPart += p.value;
          break;
        case 'fraction':
          decimalPart += p.value;
          break;
        // case 'currency':
        //   break;
        // case 'literal':
        //   break;
      }
    });

    // no 
    if(!integerPart) return 0;

    //why?
    if(decimalPart && decimalPart.length >= 2) {
      const newPosition = cursorPosition - (decimalPart.length -2);
      setCursorPosition(newPosition);
    }

    const preciseValue = parseFloat(`${integerPart}.${decimalPart.slice(0, 2)}`);
    return preciseValue;
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
    const shift: number = ( formatValue(clean).length - value.length )
    const cursorShift = shift >= 0 ? shift : 0;
    setCursorPosition(oldSelection + cursorShift);
  }
  
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  }

  useEffect(() => {
    console.log(inputRef, inputRef.current, document.activeElement);
    if(
      inputRef &&
      inputRef.current &&
      document.activeElement === inputRef.current
      ) {
        console.log(cursorPosition, new Date());
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
        className="w-full h-10 p-2 border rounded border-neutral-200 focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
      { /* <span className="absolute right-0 w-1/6 p-2 text-center w-h-10 rounded-r-md bg-neutral-200 dark:bg-neutral-900">{currency}</span> */ }
    </div>
  )
}
