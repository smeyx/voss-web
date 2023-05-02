import React, { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currency: string;
  startValue?: number;
  decimalSeparator?: string,
  setValue?: (value: number) => void
}

// extract to config?
const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2, minimumFractionDigits: 2 });

const formatValue = (value: number): string => {
  const formattedValue = formatter.format(value ? value : 0)
  return formattedValue;
};

const moveCursor = (
  formattedValue: string, 
  selectionStart: number | null) => {
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
  const [formattedValue, setFormattedValue] = useState<string>(formatValue(startValue));
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [lastInput, setLastInput] = useState<string | null>(null);
  const [groupSeparator, setGroupSeparator] = useState<string>('.');
  const [changes, setChanges] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cleanValue = (value: string): number => {
    if(!value) return 0.0;
    
    const replaceSeparators = new RegExp('[^\\w' + decimalSeparator + ']', 'g');
    const purgedValue: string = value
      .replaceAll(replaceSeparators, '')
      .replaceAll(decimalSeparator, '.');

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
        case 'group':
          setGroupSeparator(p.value); 
          break;
        // case 'currency':
        //   break;
        // case 'literal':
        //   break;
      }
    });

    // no 
    if(!integerPart) return 0;

    ////why?
    if(decimalPart && decimalPart.length >= 2) {
      // const newPosition = cursorPosition - (decimalPart.length -2);
      // setCursorPosition(newPosition);
    }

    const preciseValue = parseFloat(`${integerPart}.${decimalPart.slice(0, 2)}`);
    return preciseValue;
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.currentTarget;

    const clean: number = cleanValue(value);
    if (rawValue != clean) {
      setRawValue(clean);
      if (setValue) {
        setValue(clean);
      }

      const formatted = formatValue(clean);
      setFormattedValue(formatted);

      //TODO: fix cursor shifting
      if (selectionStart) {
        const shift: number = (formatted.length - value.length)
        const cursorShift = shift >= 0 ? shift : 0;
        // if the deletion affects group separator skip cursor
        if (lastInput === 'Backspace' && formatted.charAt(selectionStart) === groupSeparator) {
          setCursorPosition(selectionStart - 1);
        } else {
          setCursorPosition(selectionStart + cursorShift);
        }
      }
    }
  }
  
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    setLastInput(key);
  }
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    setLastInput(key);
  }

  useEffect(() => {
    if(
      inputRef &&
      inputRef.current &&
      document.activeElement === inputRef.current
      ) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
  }, [rawValue, formattedValue, cursorPosition, inputRef, changes])

  return (
    <div className="relative flex items-center mb-4">
      <input
        type="text"
        value={ formattedValue }
        {...props}
        ref={ inputRef }
        inputMode="numeric"
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handlePriceChange(e) }
        onKeyUp={ (e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(e) } 
        onKeyDown={ (e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(e) }
        className="w-full h-10 p-2 border rounded border-neutral-200 focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
      { /* <span className="absolute right-0 w-1/6 p-2 text-center w-h-10 rounded-r-md bg-neutral-200 dark:bg-neutral-900">{currency}</span> */ }
    </div>
  )
}
