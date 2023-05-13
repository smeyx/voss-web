import { Knex } from 'knex';

export const findById = (
  queryBuilder: Knex.QueryBuilder, 
  fieldName: string, 
  fieldValue: number) => {
  if (fieldValue > 0) {
    queryBuilder.where(fieldName, fieldValue).first();
  }
}

export const pagination = (queryBuilder: Knex.QueryBuilder, offset: number, limit: number) => {
  if (offset >= 0 && limit >= 0) {
    if (offset === 0) {
      queryBuilder.limit(limit);
    } else {
      //TODO: stupid wording
      queryBuilder.limit(limit);
      queryBuilder.offset(offset);
    }
  }
}
