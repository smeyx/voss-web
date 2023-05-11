import { ReactElement, useState, useMemo } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeSlash, Spinner } from 'phosphor-react';
import ErrorMessage from "@components/ErrorMessage";
import Button from '@components/Button';

export interface AuthenticationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  authInProgress?: boolean,
  authSuccess?: boolean,
  preFillEmail?: string,
  children?: ReactElement | string
  errorResponse?: string
}

//TODO: rethink approach. 
export default function AuthenticationForm({ onSubmit, authInProgress, authSuccess, children, errorResponse, preFillEmail = ''}: AuthenticationFormProps): ReactElement | null {
  const [email, setEmail] = useState<string>(preFillEmail);
  const [password, setPassword] = useState<string>('');
  const [ passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const showPasswordButton = useMemo(() => passwordVisibility ? <EyeSlash size={20} /> : <Eye size={20}/>, [passwordVisibility])

  const { pathname } = useRouter();
  const minLength = pathname === '/login' ? 0 : 8;
  const passwordAutocomplete = pathname === '/login' ? 'current-password' : 'new-password';

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  return (
    <div className="flex flex-col items-center max-w-lg p-6 mx-auto md:mt-20 bg-white border border-gray-200 rounded-xl dark:border-neutral-800 dark:bg-neutral-700 shadow-md dark:shadow-none">
      <h1 className="text-3xl pb-8 dark:text-white">
        {`${(pathname === '/login' ? 'Login' : 'Welcome')} to VOSS.`}
      </h1>
      <form className="flex flex-col flex-1 gap-2 w-full" onSubmit={onSubmit}>
        <label className="font-bold dark:text-white" htmlFor="email">E-Mail</label>
        <input type="email" 
        name="email"
        placeholder="E-Mail" 
        autoComplete="username"
        id="email" 
        required 
        value={email} 
        onChange={handleEmailChange} 
        className="p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white" />
        <label className="font-bold dark:text-white" htmlFor="password">Password</label>
        <div className="relative flex items-center mb-6 ">
          <input type={ passwordVisibility ? 'text' : 'password' }
            placeholder="Password"
            autoComplete={ passwordAutocomplete }
            id="new-password"
            name="password"
            required
            minLength={minLength}
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:bg-neutral-600 dark:border-neutral-800 dark:text-white dark:outline-secondary-500" />
          <button type="button"
            title={ `${ passwordVisibility ? 'Hide' : 'Show'} password`}
            className="absolute mr-2 h-full right-0 flex items-center bg-transparent dark:text-white"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >

            { showPasswordButton }
          </button>
        </div>
        {errorResponse &&
          <ErrorMessage errorMessage={errorResponse} />
        }
        <div className="flex justify-center">
          <Button 
            loading={ authInProgress }
            success={ authSuccess }
            type="submit">
            {children || 'Login'}
          </Button>
          <Link className="ml-2 flex-1 text-center hover:text-primary-900" href={pathname === '/login' ? '/register' : '/login'}>
            <Button className="w-full h-full p-2 font-bold">
              {pathname === '/login' ? 'Register' : 'Sign in'}
            </Button>
          </Link>
        </div>
      </form>
      </div>
  );
}
