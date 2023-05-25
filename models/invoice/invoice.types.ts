export type Invoice = {
  id: number,
  numberRangeId: number,
  scheduleOptionId: number,
  invoiceDate: Date,
  name: string,
  title: string,
  subtext: string,
  positions: Position[],
  no_vat_clause: boolean,
  user_id: number,
}

export type Position = {
  id?: number,
  name: string,
  price: string,
  amount: number,
}

export type DbPosition = {
  name: string,
  price: string,
  amount: number,
}

export type DbInvoice = { 
  id: number,
  name: string,
  title?: string,
  date: Date,
  positions: DbPosition[],
}
