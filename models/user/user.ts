import knex from '@lib/db';
import type { User } from './user.types';

class EmailTakenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserModel {
  async findByEmail(newEmail: string): Promise<boolean> {
    const res = await knex('users')
      .select('email')
      .where('email', newEmail)
      .first();

    if(res && res.email) {
      return res.email === newEmail;
    }

    return false;
  }
  async findById(id: number): Promise<User> {
    const user: User = await knex('users')
      .select('email')
      .where('id', id)
      .first();
    return user;
  }

  async insert(email: string, hash: string) {
    const already = await this.findByEmail(email);
    if(already) { 
      throw new EmailTakenError('Email is already taken');
    }

    const { id } = await knex('users')
      .insert({ email, password: hash, time_created: new Date()})
      .returning('id');

    if(id) {
      return true;
    }

    return false;
  }
}
