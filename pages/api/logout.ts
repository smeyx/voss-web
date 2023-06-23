import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session/session';

import type { NextApiRequest, NextApiResponse } from 'next/types';

async function logoutRoute( req: NextApiRequest, res: NextApiResponse) {
  if(req.session) {
    req.session.destroy();
  }

  res.status(200).send(true);
}

export default withIronSessionApiRoute(logoutRoute, sessionParameters);
