export interface Address {
  street: string,
  nr: string,
  code: string,
  city: string,
}

export type Person = {
  name: string,
  address: Address,
  phone?: string,
  email?: string,
  creditInstitute?: string,
  iban?: string,
  bic?: string,
  vat?: string,
}

export interface Position {
  description: string,
  price: number,
  amount: number,
}
