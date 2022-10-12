import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import type { NextApiRequest, NextApiResponse } from 'next/types';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ login: 'false' });
}

export default withIronSessionApiRoute(loginRoute, sessionParameters);
