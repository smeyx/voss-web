import React, { ReactElement, useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface AuthenticationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  children?: ReactElement | string
  errorResponse?: string
}

export default function AuthenticationForm({ onSubmit, children, errorResponse }: AuthenticationFormProps): ReactElement | null {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { pathname } = useRouter();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  return (
    <div className="flex flex-row items-center max-w-lg p-6 mx-auto mt-20 bg-white border border-gray-200 rounded-xl dark:border-neutral-800 dark:bg-neutral-700">
        <form className="flex flex-col flex-1 gap-2" onSubmit={ onSubmit }>
          <label className="font-bold dark:text-white" htmlFor="email">E-Mail</label>
          <input type="email" placeholder="E-Mail" id="email" required value={ email } onChange={ handleEmailChange } className="p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white"/>
        <label className="font-bold dark:text-white" htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" required minLength={ 4 } value={ password } onChange={ handlePasswordChange } className="p-2 mb-6 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white dark:outline-secondary-500" />
          <div className="flex justify-center">
            <button className="flex-1 p-2 text-white border-2 rounded bg-primary-500 border-primary-500 hover:border-primary-600 hover:bg-primary-600 transition-colors dark:text-neutral-800 dark:bg-secondary-500 dark:border-secondary-500 dark:hover:border-secondary-600 dark:hover:bg-secondary-600" type="submit">{ children || 'Login' }</button>
            <Link className="flex-1 w-5/12 text-center hover:text-primary-900" href={ pathname === '/login' ? '/register' : '/login' }>
              <button className="w-full h-full p-2 font-bold bg-transparent text-primary-500 hover:text-primary-600 dark:text-secondary-500 dark:hover:text-secondary-600">{ pathname === '/login' ? 'Register' : 'Sign in' }</button>
            </Link>
            </div>
          <p className="text-red-800">{ errorResponse && errorResponse }</p>
      </form>
      </div>
  );
}
