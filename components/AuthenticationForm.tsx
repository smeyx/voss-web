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
      <div className="flex flex-row items-center max-w-lg p-6 mx-auto mt-20 bg-white border border-gray-100 shadow-lg rounded-xl">
        <form className="flex flex-col flex-1 gap-2" onSubmit={ onSubmit }>
        <label className="font-bold" htmlFor="email">E-Mail</label>
          <input type="email" placeholder="E-Mail" id="email" required value={ email } onChange={ handleEmailChange } className="p-2 mb-4 border border-gray-100 rounded focus:outline outline-1 outline-primary-500"/>
        <label className="font-bold" htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" required value={ password } onChange={ handlePasswordChange } className="p-2 mb-6 border border-gray-100 rounded focus:outline outline-1 outline-primary-500" />
          <div className="flex justify-center">
          <button className="flex-1 p-2 text-white border-2 rounded bg-primary-500 border-primary-500 hover:border-primary-600 hover:bg-primary-600 transition-colors" type="submit">{ children || 'Login' }</button>
            <Link className="flex-1 w-5/12 text-center hover:text-primary-900" href={ pathname === '/login' ? '/register' : '/login' }>
              <button className="w-full h-full p-2 font-bold bg-transparent text-primary-500 hover:text-primary-600">{ pathname === '/login' ? 'Register' : 'Sign in' }</button>
            </Link>
            </div>
          <p className="text-red-800">{ errorResponse && errorResponse }</p>
      </form>
      </div>
  );
}
