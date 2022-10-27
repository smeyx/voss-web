import { NextApiRequest, NextApiResponse } from 'next/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { UserModel } from '@models/user/user'; 
import type { User } from '@models/user/user.types';

async function userRoute(req: NextApiRequest, res: NextApiResponse<User | false>) {
  if(req.session && req.session.user?.id) {
    const users = new UserModel();
    const user: User = await users.findById(req.session.user.id);
    user.isLoggedIn = true;

    res.json(user);
  } else {
    res.status(200).json(false);
  }
};

export default withIronSessionApiRoute(userRoute, sessionParameters);
