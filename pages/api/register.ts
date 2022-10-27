import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { UserModel } from '@models/user/user';

import type { NextApiRequest, NextApiResponse } from 'next/types';

export type RegistrationResponse = {
  error: boolean,
  code: string,
  message?: string,
};

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  const users = new UserModel();

  try {
    let status: RegistrationResponse;
    const resp = await users.register(email, password);
    if(resp) {
      status = { error: false, code: 'success' };
    } else {
      status = { error: true, code: 'database_error' };
    }

    res.status(200).send(status);
  } catch(err) {
    console.log(err);
    res.status(200).send({ error: true, code: 'email_is_taken', message: 'This email is already taken' });
  }
};

export default withIronSessionApiRoute(registerRoute, sessionParameters);
