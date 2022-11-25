import knex from '@lib/db';
import { Knex } from 'knex';
import type { Customer } from './customer.types';

export class CustomerModel {
  async find(user_id: number, start?: number, end?: number, id?: number): Promise<Customer> {
    const findById = (queryBuilder: Knex.QueryBuilder, customerId: number) => {
      if (customerId > 0) {
        queryBuilder.where('customers.id', customerId).first();
      }
    }
    
    const pagination = (queryBuilder: Knex.QueryBuilder, start: number, end:number) => {
      if(start >= 0 && end >= 0) {
        if(start === 0) {
          queryBuilder.limit(end);
        } else {
          queryBuilder.limit(end);
          queryBuilder.offset(start);
        }
      }
    }

    const customers = await knex('customers')
      .join('addresses', 'customers.id', '=', 'addresses.customer_id')
      .modify(findById, id)
      .modify(pagination, start, end)
      .select(
        'customers.id',
        'name',
        'email',
        'addresses.street',
        'addresses.housenumber',
        'addresses.city',
        'addresses.postalcode'
      )
    .where('customers.user_id', user_id);

    const newCustomers = customers.reduce((acc: Customer[], customer:{ id: number, name: string, email: string, street: string, housenumber: string, city: string, postalcode: string }) => {
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

    return newCustomers;
  }

  async addCustomer(customer: Customer) {
    const [ res ] = await knex('customers')
      .insert({ 
        name: customer.name,
        email: customer.email,
        time_created: new Date(),
        time_updated: new Date()
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
