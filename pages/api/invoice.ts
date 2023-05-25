import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { Invoice, Position } from '@models/invoice/invoice.types';

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
        let newInvoice: Invoice;
        let { 
          id,
          numberRangeId: number_range_id,
          scheduleOptionId: schedule_option_id,
          invoiceDate: invoice_date,
          name,
          title,
          subtext,
          positions,
          noVATClause: no_vat_clause,
          user_id,
        }: Invoice = newInvoice = req.body;
        
        console.log(newInvoice);

        res.status(200).json({ success: false });
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
