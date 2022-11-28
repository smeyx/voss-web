import knex from '@lib/db';
import { Knex } from 'knex';
import type { Customer } from './customer.types';

interface PaginationCustomerListResponse {
  count: number | string,
  customers: Customer[],
}
export class CustomerModel {
  async find(user_id: number, offset?: number, limit?: number, id?: number): Promise<PaginationCustomerListResponse> {
    const findById = (queryBuilder: Knex.QueryBuilder, customerId: number) => {
      if (customerId > 0) {
        queryBuilder.where('customers.id', customerId).first();
      }
    }
    
    const pagination = (queryBuilder: Knex.QueryBuilder, offset: number, limit:number) => {
      if(offset >= 0 && limit >= 0) {
        if(offset === 0) {
          queryBuilder.limit(limit);
        } else {
          //TODO: stupid wording
          queryBuilder.limit(limit);
          queryBuilder.offset(offset);
        }
      }
    }

    const [customers, count] = await Promise.all([
      knex('customers')
      .leftJoin('addresses', 'customers.id', '=', 'addresses.customer_id')
      .modify(findById, id)
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
      .where('customers.user_id', user_id),
      knex('customers').count<Record<string, number>>('id').where('user_id', user_id),
    ]);

    //TODO: ugly typing
    const newCustomers: Customer[] = customers.reduce((acc: Customer[], customer:{ id: number, name: string, email: string, street: string, housenumber: string, city: string, postalcode: string }) => {
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

    //TODO: sleek?
    const respCount = Object.values(count[0]).pop();
    return { count: respCount, customers: newCustomers };
  }

  async addCustomer(customer: Customer, user_id: number) {
    const [ res ] = await knex('customers')
      .insert({ 
        name: customer.name,
        email: customer.email,
        time_created: new Date(),
        time_updated: new Date(),
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
