import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session/session';
import { UserModel } from '@models/user/user';

import type { NextApiRequest, NextApiResponse } from 'next/types';

export type RegistrationResponse = {
  success: boolean,
  code?: string,
  message?: string,
};

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  const users = new UserModel();

  try {
    let status: RegistrationResponse;
    const resp = await users.register(email, password);
    if(resp && resp.success === true) {
      status = { success: true };
    } else {
      status = { success: false, code: resp.errorCode, message: resp.errorMessage };
    }

    res.status(200).send(status);
  } catch(err) {
    res.status(200).send({ success: false, code: 'error_registration', message: 'Error whilst registering user.' });
  }
};

export default withIronSessionApiRoute(registerRoute, sessionParameters);
