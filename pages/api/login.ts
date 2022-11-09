import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { UserModel } from '@models/user/user';
import type { NextApiRequest, NextApiResponse } from 'next/types';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  const users = new UserModel();

  try {
    let user = await users.login(email, password);
    if(user) {
      req.session.user = user;
      req.session.user.isLoggedIn = true;
      await req.session.save();

      user = req.session.user;
      res.status(200).json({ success: true, user });
    }

  } catch(e) {
    console.log(e);
    res.status(200).json({ success: false });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionParameters);
