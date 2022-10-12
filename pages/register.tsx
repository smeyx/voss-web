import { useState } from 'react';
import fetchJSON from '@lib/fetchJSON';
import AuthenticationForm from '@components/AuthenticationForm';
import type { NextPage } from 'next';
import type { RegistrationResponse } from '../pages/api/register';

export type extraProps = {
  errorResponse?: string,
}

const Register:NextPage = () => {
  const [extraProps, setExtraProps] = useState<extraProps>();

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
      const username = event.currentTarget.username.value;
      const password = event.currentTarget.password.value
      const { error, code, message } = await fetchJSON<RegistrationResponse>('/api/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ username, password }) 
      });
      
      if(error) {
        if(message) {
          setExtraProps({ errorResponse: message});
        }
      }

    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto text-gray-800">
        <AuthenticationForm onSubmit={ handleSubmitRegister } { ...extraProps }>Register</AuthenticationForm>
    </div>
  );
}

export default Register;
