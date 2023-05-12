import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import type { User } from '@models/user';
import type { NextApiRequest, NextApiResponse } from 'next/types';

async function invoiceRoute(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      try {
      } catch (e) {
        console.log(e);
        res.status(200).json({ success: false })
      }
      break;
    case 'POST':
      try {
          console.log(req);
      } catch (e) {
        console.log(e);
        res.status(200).json({ success: false });
      }

      break;
      default:
          console.log('default called');
        res.setHeader('Allow', ['POST', 'GET'])
        res.status(405).end(`Method ${ req.method } not allowed.`)
  }
}

export default withIronSessionApiRoute(invoiceRoute, sessionParameters);
