import Link from 'next/link';
import type { ReactElement } from 'react';

type AuthButtonProps = {
  clickAction?: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
  authLink: string,
  children: ReactElement | string,
};

const AuthButton: React.FC<AuthButtonProps> = ({ clickAction, authLink = '', children }): JSX.Element => {
  return (
    <Link href={ authLink } passHref>
      <button onClick={ clickAction } className="p-2 px-4 text-white uppercase rounded bg-primary-500 transition-colors hover:bg-primary-600 dark:bg-secondary-500 dark:hover:bg-secondary-600 dark:text-neutral-800">
          { children }
      </button>
    </Link>
  )
};

export default AuthButton;