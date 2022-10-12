import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { UserModel } from '@models/user/user';
import type { NextApiRequest, NextApiResponse } from 'next/types';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  const users = new UserModel();

  try {
    const login = await users.login(email, password);
    if(login) {
      req.session.email = email;
    }

    res.status(200).json({ login });
  } catch(e) {
    console.log(e);
    res.status(200).json({ login: false });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionParameters);
