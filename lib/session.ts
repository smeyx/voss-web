import { withIronSessionSsr } from 'iron-session/next';

export const sessionParameters = {
  cookieName: 'voss_s_cookie',
  password: 'voss_cookie_pass_must_be_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const protectedSsrPage = withIronSessionSsr(
  async function({ req }) {
    const user = req.session.user;
    if(user === undefined) {
      return {
        redirect: {
          statusCode: 302,
          destination: '/login',
        }
      }
    }

    return {
      props: {
        user: req.session.user,
      }
    }
  },
  sessionParameters
);

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      email: string;
      id: number;
      isLoggedIn?: boolean;
    }
  }
}
