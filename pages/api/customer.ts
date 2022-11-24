import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import { CustomerModel } from '@models/customer';
import type { Customer } from '@models/customer';
import type { NextApiRequest, NextApiResponse } from 'next/types';

async function newCustomerRoute(req: NextApiRequest, res: NextApiResponse) {
  const model = new CustomerModel();

  switch(req.method) {
    case 'GET':
      try {
        const { customer_id } = await req.body;
        const customers = customer_id > 0 ? await model.find(customer_id) : await model.find();
        console.log(customers)
        res.status(200).json({ success: true, customers})
    } catch(e) {
    console.log(e);
        res.status(200).json({ success: false })
      }
      break;
    case 'POST':
      try {
        const { name, email, address } = await req.body;
        let newCustomer = await model.addCustomer({
          name,
          email,
          address: {
            street: address.street,
            housenumber: address.housenumber,
            city: address.city,
            postalcode: address.postalcode
          }
        } as Customer);

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

export default withIronSessionApiRoute(newCustomerRoute, sessionParameters);
