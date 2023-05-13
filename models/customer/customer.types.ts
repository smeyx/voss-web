export type Customer = {
  id?: number,
  name: string,
  email: string,
  address: Partial<CustomerAddress>,
}

export type CustomerAddress = {
  street: string,
  housenumber: string,
  city: string,
  postalcode: string,
}


export type DbCustomer = { 
  id: number,
  name: string, 
  email: string, 
  street: string, 
  housenumber: string, 
  city: string, 
  postalcode: string
}
