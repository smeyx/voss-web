import { SWRResponse } from 'swr';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionParameters } from '@lib/session';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { Invoice, Position } from '@models/invoice/invoice.types';
import { InvoiceModel } from '@models/invoice/invoice';

export interface InvoiceApiResponse extends SWRResponse {
  success: boolean,
  data: InvoiceResponse,
}

export interface InvoiceResponse {
  count: number,
  invoices: Invoice[]
}

async function invoiceRoute(req: NextApiRequest, res: NextApiResponse) {
  const invoices = new InvoiceModel();
  switch(req.method) {
    case 'GET':
      try {
        const invoice_id = parseInt(req.query.invoice_id as string);
        const user_id = parseInt(req.query.user_id as string);
        const page = parseInt(req.query.page as string);
        const size = parseInt(req.query.size as string);

        let invoiceData;
        if (user_id) {
          if (page && size) {
            const start: number = (page - 1) * size;
            invoiceData = await invoices.find(user_id, start, size);
          } else {
            invoiceData = await invoices.find(user_id);
          }

          res.status(200).json({ success: true, data: invoiceData })
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
        let { 
          id,
          customer,
          number_range_id,
          schedule_option,
          date,
          name,
          title,
          subtext,
          no_vat,
          user_id,
        } = req.body;
        
        const positions = JSON.parse(req.body.positions)
        .filter((p: Position) => p !== null);
        
        const invoice = await invoices.create({
          userId: user_id,
          customerId: customer,
          numberRangeId: number_range_id,
          name,
          title,
          subtext,
          invoiceDate: date,
          scheduleOptionId: schedule_option,
          noVATClause: no_vat,
          positions,
        }, user_id);

        if( invoice ) {
          res.status(200).json({ success: true, invoice });
        } else {
          res.status(200).json({ success: false });
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

export default withIronSessionApiRoute(invoiceRoute, sessionParameters);
