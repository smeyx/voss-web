import React, { ReactElement, useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface AuthenticationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  children?: ReactElement | string
  errorResponse?: string
}

export default function AuthenticationForm({ onSubmit, children, errorResponse }: AuthenticationFormProps): ReactElement | null {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { pathname } = useRouter();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }

  return (
      <div className="flex flex-row items-center max-w-lg p-6 mx-auto mt-20 bg-white border border-gray-200 shadow-lg rounded-xl">
        <form className="flex flex-col flex-1 gap-2" onSubmit={ onSubmit }>
        <label className="font-bold" htmlFor="username">Username</label>
          <input type="text" placeholder="Username" id="username" required value={ username } onChange={ handleUsernameChange } className="p-2 mb-4 border border-gray-300 rounded active:border-purple-600"/>
        <label className="font-bold" htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" required value={ password } onChange={ handlePasswordChange } className="p-2 mb-6 border border-gray-300 rounded active:border-purple-600"/>
          <div className="flex items-center">
          <button className="flex-1 p-3 text-white bg-purple-600 border-2 border-purple-600 rounded hover:border-purple-800 hover:bg-purple-800 transition-colors" type="submit">{ children || 'Login' }</button>
            <Link href={ pathname === '/login' ? '/register' : '/login' }><button className="flex-1 p-3 font-bold text-purple-600 bg-transparent hover:text-purple-900">{ pathname === '/login' ? 'Register' : 'Sign in' }</button></Link>
            </div>
          <p className="text-red-800">{ errorResponse && errorResponse }</p>
      </form>
      </div>
  );
}
