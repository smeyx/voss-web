import fetchJSON from '@lib/fetchJSON';
import AuthenticationForm from '@components/AuthenticationForm';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { useState } from 'react';
import useUser from '@lib/useUser';
import type { NextPage, GetServerSideProps } from 'next/types';
import type { User } from '@models/user/user.types';

export type extraProps = {
  errorResponse?: string,
}

type LoginResponse = {
  success: boolean,
  user?: User
}

const LoginPage:NextPage = () => {
  const [extraProps, setExtraProps] = useState<extraProps>();
  const [ authInProgress, setAuthInProgress ] = useState<boolean>(false);
  const [ authSuccess, setAuthSuccess ] = useState<boolean>(false);

  const router = useRouter();
  const { mutateUser } = useUser();

  let { email } = router.query || ''; 

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
      const email = event.currentTarget.email.value;
      const password = event.currentTarget.password.value;

      setAuthInProgress(true);
      const response: LoginResponse = await fetchJSON('/api/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });

      setAuthInProgress(false);
      if(response && response.success === false) {
        setExtraProps({ errorResponse: 'Your e-mail or password is not right. Try again.' });
      }

      if(response && response.success === true) {
        setAuthSuccess(true);
        mutateUser(response.user);
        router.push('/dashboard/overview');
      }

    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto text-gray-800">
      <AuthenticationForm authInProgress={ authInProgress } authSuccess={ authSuccess } onSubmit={handleSubmitLogin} preFillEmail={ email as string }{...extraProps}>Login</AuthenticationForm>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    const user = req.session.user;

    if(user) {
      res.setHeader('location', '/dashboard/overview');
      res.statusCode = 302;
      res.end();
    }

    // TODO: dumb?
    // avoid seeing login
    return {
      props: {}
    }
  },
  sessionParameters
);

export default LoginPage;
