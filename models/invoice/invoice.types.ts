export type Invoice = {
  id?: number,
  customerId: number,
  numberRangeId: number,
  scheduleOptionId: number,
  invoiceDate: Date,
  name: string,
  title: string,
  subtext: string,
  positions: Position[],
  noVATClause: boolean,
  userId: number,
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
