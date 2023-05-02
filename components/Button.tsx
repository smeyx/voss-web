import { Spinner, Check } from 'phosphor-react';
import type { ReactElement } from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    success?: boolean,
    // confirmationState?: ReactElement
}

export default function Button({ children, loading, success, ...props }: ButtonProps): ReactElement {
    const loadingState = <Spinner size={ 20 } className="animate-spin-slow"/>;
    const confirmationState = <Check size="20" />;
    let innerButton = children;
    
    const { className } = props;
    delete props.className;

    if(loading) {
        innerButton = loadingState;
    }
    
    if(success) {
        innerButton = confirmationState;
    }

    const buttonClass: string = `h-12 flex-1 px-4 py-2 text-white border-2 rounded bg-primary-500 
    border-primary-500 hover:border-primary-600 hover:bg-primary-600 transition-colors 
    dark:text-neutral-800 dark:bg-secondary-500 dark:border-secondary-500 dark:hover:border-secondary-600 
    dark:hover:bg-secondary-600`;
    return (
        <button className={[className, buttonClass].join(" ")} {...props}>
            <span className="flex items-center justify-center">
                {innerButton}
            </span>
        </button>
    )
}