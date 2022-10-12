import fetchJSON from '@lib/fetchJSON';
import AuthenticationForm from '@components/AuthenticationForm';
import type { NextPage } from 'next';

const Login:NextPage = () => {
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
      const username = event.currentTarget.username.value;
      const password = event.currentTarget.password.value;

      const data = await fetchJSON('/api/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ username, password }) 
      });

      console.log(data)
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto text-gray-800">
        <AuthenticationForm onSubmit={ handleSubmitLogin }>Login</AuthenticationForm>
    </div>
  );
}

export default Login;
