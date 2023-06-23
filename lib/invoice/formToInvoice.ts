import type { Position } from "@models/invoice/invoice.types";
/**
 * This function appends positions of the form into an array and readds it to the given formdata.
 *
 * @param form The FormData to restructure
 * @returns The FormData with positions
 */
const formToInvoice = (form: FormData): FormData => {
  if(!form) {
    throw new Error("No FormData given");
  }

  const positions: Array<Position> = [];
  const deleteEntries: Array<string> = [];
  const entries = form.entries();
  let element = entries.next();
  while (!element.done) {
    const [k, v] = element.value;
    //just to make it overly complicated
    // move positions into their own object
    if (k.includes('position')) {
      const parts = k.split('_');
      if (parts && parts.length > 0) {
        let index = parts.pop();
        const field = parts.pop();


        if (index && field) {
          let numIndex: number = parseInt(index);
          if (!positions[numIndex]) {
            positions[numIndex] = {
              name: '',
              price: '',
              amount: 0,
            } as Position;
          }

          // @ts-ignore
          positions[index][field] = v;

        }

      }

      deleteEntries.push(k);
    }

    element = entries.next();
  }

  // delete unnecessary positions from formdata.
  for (let i of deleteEntries) form.delete(i);
  form.append('positions', JSON.stringify(positions));

  return form;
}

export { formToInvoice };