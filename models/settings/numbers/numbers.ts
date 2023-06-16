import knex from '@lib/db';
import { findById } from '@models/helpers';
import type { NumberRange } from '.'

export default class NumberModel {
  async find(user_id: number, id?: number): Promise<Partial<NumberRange>> {
    const numberRange: Partial<NumberRange> = await knex('number_ranges')
      .select('id', 'name', 'prefix', 'filler', 'number_length', 'current_number')
      .modify(findById, 'id', id)
      .where('user_id', user_id);
    
      return numberRange;
  }

  async create(numberRange: NumberRange) {
    const now = new Date();

    const [res] = await knex('number_ranges')
      .insert({
        name: numberRange.name,
        prefix: numberRange.prefix,
        current_number: numberRange.currentNumber,
        filler: numberRange.filler,
        number_length: numberRange.numberLength,
        user_id: numberRange.user_id,
        time_created: now,
        time_updated: now,
      })
      .returning('id');

    if(res.id) {
      return {
        success: true,
      }
    }
    
    return {
      success: false,
      errorCode: 'database_error',
      errorMessage: 'Database error' 
    }
  }

  async update(numberRange: NumberRange) {
    const now = new Date();
    const [res]: NumberRange[] = await knex('number_ranges')
      .update({
        id: numberRange.id,
        name: numberRange.name,
        prefix: numberRange.prefix,
        filler: numberRange.filler,
        number_length: numberRange.numberLength,
        user_id: numberRange.user_id,
        time_updated: now,
      })
      .where('id', numberRange.id)
      .andWhere('user_id', numberRange.user_id)
      .returning('*');

    if (res) {
      return res;
    }

    return {
      success: false,
      errorCode: 'database_error',
      errorMessage: 'Database error'
    }
  }
}