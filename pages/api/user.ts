import { NextApiRequest, NextApiResponse } from 'next/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { UserModel } from '@models/user/user'; 
import type { User } from '@models/user/user.types';

async function userRoute(req: NextApiRequest, res: NextApiResponse<{ email: string, id: number } | false>) {
  if(req.session && req.session.id) {
    const users = new UserModel();
    const user: { email: string, id: number } = await users.findById(req.session.id);

    res.status(200).json(user);
  }

  res.status(200).json(false);
};

export default withIronSessionApiRoute(userRoute, sessionParameters);
