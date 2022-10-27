export const sessionParameters = {
  cookieName: 'voss_s_cookie',
  password: 'voss_cookie_pass_must_be_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      email: string;
      id: number;
      isLoggedIn?: boolean;
    }
  }
}
