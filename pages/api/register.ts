import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { createHmac } from 'crypto';
import { UserModel } from '@models/user/user';
import bcrypt from 'bcrypt';

import type { NextApiRequest, NextApiResponse } from 'next/types';

export type RegistrationResponse = {
  error: boolean,
  code: string,
  message?: string,
};

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;
  const passwordHash = createHmac('sha256', process.env.COOKIE_PW as string).update(password).digest('hex');
  const saltRounds = 12;

  const hash = await bcrypt.hash(passwordHash, saltRounds);
  const users = new UserModel();

  try {
    let status: RegistrationResponse;
    const resp = await users.insert(username, hash);
    if(resp) {
      status = { error: false, code: 'success' };
      res.status(200).send({ error: false, code: 'success' });
    } else {
      status = { error: true, code: 'database_error' };
    }

    res.status(200).send(status);
  } catch(EmailTakenError) {
    res.status(200).send({ error: true, code: 'email_is_taken', message: 'This email is already taken' });
  }
};

export default withIronSessionApiRoute(registerRoute, sessionParameters);
