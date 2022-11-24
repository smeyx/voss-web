export type Customer = {
  id?: number,
  name: string,
  email: string,
  address: CustomerAddress,
}

export type CustomerAddress = {
  street: string,
  housenumber: string,
  city: string,
  postalcode: string,
}
