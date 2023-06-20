export type Config = {
  invoiceNumber: invoiceNumberOptions,
  currentInvoiceNumber: number;
  namePrefix: string;
}

export type invoiceNumberOptions = {
  currentInvoiceNumber: number,
}
