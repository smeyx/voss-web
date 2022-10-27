import fetchJSON from '@lib/fetchJSON';
import AuthenticationForm from '@components/AuthenticationForm';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import useUser from '@lib/useUser';
import type { NextPage, GetServerSideProps } from 'next/types';
import type { User } from '@models/user/user.types';

const Login:NextPage = () => {
  const router = useRouter();
  const { mutateUser } = useUser();

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
      const email = event.currentTarget.email.value;
      const password = event.currentTarget.password.value;

      const data: User = await fetchJSON('/api/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });

      if(data) {
        mutateUser(data);
        router.push('/dashboard');
      }

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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function ({ req, res }) {
    const user = req.session.user;

    if(user) {
      res.setHeader('location', '/dashboard');
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

export default Login;
