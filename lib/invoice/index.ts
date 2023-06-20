import { formToInvoice } from "./formToInvoice";
import { }

export { formToInvoice }
// import jsPDF from 'jspdf';
// import { readFileSync, writeFileSync } from 'fs';
// import { resolve } from 'path';
// import { Invoice } from './invoice';
// import { Person, Position } from './types/person';
// import { Config } from './types/config';

// const seller:Person = JSON.parse(readFileSync(resolve(__dirname, '../seller.json'), { encoding: 'utf-8' }));
// const buyer:Person = JSON.parse(readFileSync(resolve(__dirname, '../buyer.json'), { encoding: 'utf-8' }));
// const config:Config = JSON.parse(readFileSync(resolve(__dirname, '../config.json'), { encoding: 'utf-8' }));
// const invoiceElements = JSON.parse(readFileSync(resolve(__dirname, '../elements.json'), { encoding: 'utf8' }));

// const { namePrefix, invoiceNumber } = config;

// const month: string = new Intl.DateTimeFormat('de-DE', { month: 'long' }).format(new Date());
// const positions: Position[] = [];
// positions.push({ description: `Warmmiete Monat ${ month }`, price: 440, amount: 1 });

// const getInvoiceNumber = (currentNumber: number): string => {
//   const today: Date = new Date();
//   let invoiceNumber: string = currentNumber.toString();
//   invoiceNumber = invoiceNumber.padStart(6, '0');

//   return `${ today.getFullYear() } - ${ invoiceNumber }`;
// };

// invoiceNumber.currentInvoiceNumber++
// let doc: jsPDF = new jsPDF({ format: 'a4' });
// const invoiceNr = getInvoiceNumber(invoiceNumber.currentInvoiceNumber);
// const inv = new Invoice(doc, { invoiceNr, invoiceElements });
// inv.setSeller = seller;
// inv.setBuyer = buyer;
// inv.setPositions = positions;
// doc = inv.create();

// writeFileSync(resolve(__dirname, '../config.json'), JSON.stringify(config), { encoding: 'utf-8' });
// doc.save(`${namePrefix }${ invoiceNr.replace(/\s+/g, '') }.pdf`);
// // doc.save('test-dynamic.pdf');
