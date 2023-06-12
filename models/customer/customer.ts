import knex from '@lib/db';
import { findById, pagination } from '@models/helpers';
import type { Customer, DbCustomer } from './customer.types';

interface PaginationCustomerListResponse {
  count: number | string,
  customers: Customer[],
}
export class CustomerModel {
  async find(user_id: number, offset?: number, limit?: number, id?: number): Promise<PaginationCustomerListResponse> {

    const [customers, count] = await Promise.all([
      knex('customers')
      .leftJoin('addresses', 'customers.id', '=', 'addresses.customer_id')
      .modify(findById, 'customers.id', id)
      .modify(pagination, offset, limit)
      .select(
        'customers.id',
        'name',
        'email',
        'addresses.street',
        'addresses.housenumber',
        'addresses.city',
        'addresses.postalcode'
      )
      .where('customers.user_id', user_id)
      .orderBy('customers.time_created', 'desc'),
      knex('customers').count<Record<string, number>>('id').where('user_id', user_id),
    ]);

    //TODO: ugly typing because database
    const response: Customer[] = customers.reduce((acc: Customer[], customer: DbCustomer
      ) => {
      acc.push({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        address: {
          street: customer.street,
          housenumber: customer.housenumber,
          city: customer.city,
          postalcode: customer.postalcode,
        }
      });

      return acc;
    }, []);

    //TODO: sleek? no.
    const respCount = Object.values(count[0]).pop();
    return { count: respCount, customers: response };
  }

  async addCustomer(customer: Customer, user_id: number) {
    const now = new Date();
    const [ res ] = await knex('customers')
      .insert({ 
        name: customer.name,
        email: customer.email,
        time_created: now,
        time_updated: now,
        user_id,
      })
      .returning('id');

    if(customer.address && res.id) {
      await knex('addresses')
        .insert({
          street: customer.address.street,
          housenumber: customer.address.housenumber,
          city: customer.address.city,
          postalcode: customer.address.postalcode,
          customer_id: res.id,
          time_created: new Date(),
          time_updated: new Date(),
        })
        .returning('id');
    }

    if(res.id) {
      return { 
        success: true
      };
    }

    return { 
      success: false, 
      errorCode: 'database_error',
      errorMessage: 'Database error' 
    };
  }
}
