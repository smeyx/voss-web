import { withIronSessionApiRoute } from "iron-session/next";
import { sessionParameters } from "@lib/session/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { NumberRange, NumberModel } from "@models/settings";
import { SWRResponse } from "swr";

export interface NumberRangeApiResponse {
  success: boolean,
  numbers: NumberRange[],
}

async function numberRangesRoute(req: NextApiRequest, res: NextApiResponse) {
  const model = new NumberModel();
  switch (req.method) {
    case 'GET': {
      let user_id: number = parseInt(req.query.user_id as string);
      if (user_id) {
        const numberRange = await model.find(user_id);
        res.status(200).json({ success: true, numbers: numberRange });
      } else {
        res.status(200).json({ success: false });
      }
      break;
    }
    case 'POST': {
        try {
          let { name, prefix, current_number, number_length, filler, user_id } = req.body;
          const numberRange: NumberRange = {
            name,
            prefix,
            currentNumber: current_number,
            numberLength: number_length,
            filler,
            user_id
          }

          let newNumberRange = await model.create(numberRange);
          if(newNumberRange) {
            res.status(200).json({ success: true, data: newNumberRange })
          }
        } catch(error) {
          console.log(error);
          res.status(200).json({ success: false});
        }
    }
      break;
    case 'PATCH': {
      try {
        let { id, name, prefix, current_number, number_length, filler, user_id } = req.body;
        const numberRange: NumberRange = {
          id,
          name,
          prefix,
          currentNumber: current_number,
          numberLength: number_length,
          filler,
          user_id
        }

        const response = await model.update(numberRange);
        if (response) {
          res.status(200).json({ success: true, data: numberRange })
        } else {
          res.status(200).json({ success: false });
        }
      } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} not allowed.`);
  }
}

export default withIronSessionApiRoute(numberRangesRoute, sessionParameters);