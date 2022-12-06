import type { ReactElement } from 'react';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
}

export default function CurrencyInput({ ...props }: CurrencyInputProps): ReactElement {
    return (
        <div>
            <input type="text" { ...props } />
        </div>
    )
}