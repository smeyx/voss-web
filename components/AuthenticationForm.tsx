import { ReactElement, useState, useMemo } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeSlash } from 'phosphor-react';

export interface AuthenticationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  preFillEmail?: string,
  children?: ReactElement | string
  errorResponse?: string
}

export default function AuthenticationForm({ onSubmit, children, errorResponse, preFillEmail = ''}: AuthenticationFormProps): ReactElement | null {
  const [email, setEmail] = useState<string>(preFillEmail);
  const [password, setPassword] = useState<string>('');
  const [ passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const showPasswordButton = useMemo(() => passwordVisibility ? <EyeSlash size={20} /> : <Eye size={20}/>, [passwordVisibility])

  const { pathname } = useRouter();
  const minLength = pathname === '/login' ? 0 : 8;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  return (
    <div className="flex flex-col items-center max-w-lg p-6 mx-auto mt-20 bg-white border border-gray-200 rounded-xl dark:border-neutral-800 dark:bg-neutral-700 shadow-md dark:shadow-none">
      <h1 className="text-3xl pb-8 dark:text-white">
        {`${(pathname === '/login' ? 'Login' : 'Welcome')} to VOSS.`}
      </h1>
      <form className="flex flex-col flex-1 gap-2 w-full" onSubmit={onSubmit}>
        <label className="font-bold dark:text-white" htmlFor="email">E-Mail</label>
        <input type="email" 
        placeholder="E-Mail" 
        id="email" 
        required 
        value={email} 
        onChange={handleEmailChange} 
        className="p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
        <label className="font-bold dark:text-white" htmlFor="password">Password</label>
        <div className="relative flex items-center mb-6 ">
          <input type={ passwordVisibility ? 'text' : 'password' }
            placeholder="Password"
            id="password"
            required
            minLength={minLength}
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white dark:outline-secondary-500" />
          <button type="button"
            title={ `${ passwordVisibility ? 'Hide' : 'Show'} password`}
            className="absolute right-0 inset-y-1 flex items-center mr-2 dark:text-white"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            { showPasswordButton }
          </button>
        </div>
        {errorResponse &&
          <aside className="rounded-md border-red-800 bg-red-100 p-5">
            <p className="text-red-800">{errorResponse && errorResponse}</p>
          </aside>
        }
        <div className="flex justify-center">
          <button className="flex-1 p-2 text-white border-2 rounded bg-primary-500 border-primary-500 hover:border-primary-600 hover:bg-primary-600 transition-colors dark:text-neutral-800 dark:bg-secondary-500 dark:border-secondary-500 dark:hover:border-secondary-600 dark:hover:bg-secondary-600" type="submit">
            {children || 'Login'}
          </button>
          <Link className="flex-1 w-5/12 text-center hover:text-primary-900" href={pathname === '/login' ? '/register' : '/login'}>
            <button className="w-full h-full p-2 font-bold bg-transparent text-primary-500 hover:text-primary-600 dark:text-secondary-500 dark:hover:text-secondary-600">
              {pathname === '/login' ? 'Register' : 'Sign in'}
            </button>
          </Link>
        </div>
      </form>
      </div>
  );
}
