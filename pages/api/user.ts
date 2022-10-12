import { NextApiRequest, NextApiResponse } from 'next/types';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { UserModel } from '@models/user/user'; 
import type { User } from '@models/user/user.types';

export default withIronSessionApiRoute(async (req: NextApiRequest, resp: NextApiResponse<User | false>) => {
  const users = new UserModel();
  const user = await users.findById(1);
  if(user) resp.json(user)
  resp.json(false);
}, sessionParameters);
