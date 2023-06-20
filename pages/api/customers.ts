import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { CustomerModel } from '@models/customer';
import type { Customer } from '@models/customer';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { SWRResponse } from 'swr';

export interface CustomerApiResponse extends SWRResponse {
  success: boolean,
  count: number,
  customers: Customer[],
}

async function customerRoute(req: NextApiRequest, res: NextApiResponse) {
  const model = new CustomerModel();

  switch(req.method) {
    case 'GET':
      try {
        //TODO: looks unnecessary
        const customer_id = parseInt(req.query.customer_id as string);
        const user_id = parseInt(req.query.user_id as string);
        const page = parseInt(req.query.page as string);
        const size = parseInt(req.query.size as string);

        let customers;
        if (user_id) {
          if (page && size) {
            const start: number = (page - 1) * size;
            customers = await model.find(user_id, start, size);
          } else {
            customers = await model.find(user_id);
          }

          res.status(200).json({ success: true, data: customers })
        } else {
          res.status(200).json({ success: false });
        }
      } catch (e) {
        console.log(e);
        res.status(200).json({ success: false })
      }
      break;
    case 'POST':
      try {
        const { name, email, address, user_id } = await req.body;
        let newCustomer = await model.addCustomer({
          name,
          email,
          address: {
            street: address.street,
            housenumber: address.housenumber,
            city: address.city,
            postalcode: address.postalcode
          }
        } as Customer,
          user_id
        );

        if (newCustomer) {
          res.status(200).json({ success: true, newCustomer });
        }

      } catch (e) {
        console.log(e);
        res.status(200).json({ success: false });
      }

      break;
      default:
        res.setHeader('Allow', ['POST', 'GET'])
        res.status(405).end(`Method ${ req.method } not allowed.`)
  }
}

export default withIronSessionApiRoute(customerRoute, sessionParameters);
