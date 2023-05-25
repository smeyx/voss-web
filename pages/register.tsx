import { useState } from 'react';
import fetchJSON from '@lib/fetchJSON';
import AuthenticationForm from '@components/AuthenticationForm';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import type { RegistrationResponse } from '../pages/api/register';

export type extraProps = {
  errorResponse?: string,
}

const RegisterPage:NextPage = () => {
  const [extraProps, setExtraProps] = useState<extraProps>();
  const [ authInProgress, setAuthInProgress ] = useState<boolean>(false);
  const [ authSuccess, setAuthSuccess ] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
      const email = event.currentTarget.email.value;
      const password = event.currentTarget.password.value
      
      setAuthInProgress(true);
      const { success, code, message } = await fetchJSON<RegistrationResponse>('/api/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });
      
      if(success === false) {
        if(message) {
          setExtraProps({ errorResponse: message});
        }
      } else {
        setAuthSuccess(true);
        router.push(`/login?email=${ email }`);
      }

    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto text-gray-800 px-4">
      <AuthenticationForm
        authInProgress={authInProgress}
        authSuccess={authSuccess}
        onSubmit={handleSubmitRegister}
        {...extraProps}
      >
        Register
      </AuthenticationForm>
    </div>
  );
}

export default RegisterPage;
