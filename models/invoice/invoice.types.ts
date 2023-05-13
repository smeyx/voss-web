export type Invoice = {
  name: string,
  title?: string,
  date: Date,
  positions: Position[],
}

export type Position = {
  name: string,
  price: string,
  amount: number,
}

export type DbPosition = {
  id: number,
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
