import knex from '@lib/db';
import { findById, pagination } from '@models/helpers';
import type { DbInvoice, DbPosition, Invoice, Position } from './invoice.types';

interface PaginationResponse {
  count: number | string,
  invoices: DbInvoice[],
}

export class InvoiceModel {
  async find(user_id: number, offset?: number, limit?: number, id?: number): Promise<PaginationResponse> {

    const [invoices, count] = await Promise.all([
      knex('invoices')
      // .leftJoin('number_ranges ', 'invoices.number_range_id', '=', 'number_ranges.id')
      .modify(findById, id)
      .modify(pagination, offset, limit)
      .select(
        'name',
        'customer_id as customerId',
        'number_range_id as numberRangeId',
        'schedule_option_id as scheduleOptionId',
        'date as invoiceDate',
        'title',
        'subtext',
        'no_vat_clause as noVATClause',
        'time_created',
        'time_updated',
        'user_id as userId'
      )
      .where('invoices.user_id', user_id),
      knex('invoices').count<Record<string, number>>('id').where('user_id', user_id),
    ]);

    //TODO: ugly typing because database
    // const newCustomers: Customer[] = customers.reduce((acc: Customer[], customer: DbCustomer
    //   ) => {
    //   acc.push({
    //     id: customer.id,
    //     name: customer.name,
    //     email: customer.email,
    //     address: {
    //       street: customer.street,
    //       housenumber: customer.housenumber,
    //       city: customer.city,
    //       postalcode: customer.postalcode,
    //     }
    //   });

    //   return acc;
    // }, [])

    //TODO: sleek? no.
    const respCount = Object.values(count[0]).pop();
    return { count: respCount, invoices };
  }

  async create(invoice: Invoice, userId: number) {
    const now = new Date();
    const [ res ] = await knex('invoices')
      .insert({ 
        name: invoice.name,
        customer_id: invoice.customerId,
        number_range_id: invoice.numberRangeId,
        schedule_option_id: invoice.scheduleOptionId,
        date: invoice.invoiceDate,
        title: invoice.title,
        subtext: invoice.subtext,
        no_vat_clause: invoice.noVATClause,
        time_created: now,
        time_updated: now,
        user_id: userId,
      })
      .returning('id');

    if(invoice.positions && res.id) {
      const positions = invoice.positions.map((p: Position) => ({
        ...p,
        invoice_id: res.id,
      }));
      
      await knex('positions')
        .insert(positions)
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
