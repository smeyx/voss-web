import knex from '@lib/db';
import { createHmac } from 'crypto';
import bcrypt from 'bcrypt';
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
      .select('email', 'id')
      .where('id', id)
      .first();
    return user;
  }

  async login(email: string, password: string): Promise<{ id: number, email: string }> {
    const res = await knex('users')
      .select('id', 'email', 'password')
      .where('email', email)
      .first();

    if(!res) {
      console.log('user not found.');
      throw new Error();
    }
    
    const preHash = createHmac('sha256', process.env.COOKIE_PW as string).update(password).digest('hex');
    const login = await bcrypt.compare(preHash, res.password);

    if(!login) {
      console.log('password did not match.');
      throw new Error();
    }

    return { id: res.id, email: res.email };
  }

  async register(email: string, password: string): Promise<boolean> {
    const already = await this.findByEmail(email);
    if(already === true) { 
      throw new EmailTakenError('Email is already taken');
    }

    const preHash = createHmac('sha256', process.env.COOKIE_PW as string).update(password).digest('hex');
    const saltRounds = 12;
    const hash = await bcrypt.hash(preHash, saltRounds);

    const [ res ] = await knex('users')
      .insert({ email, password: hash, time_created: new Date()})
      .returning('id');

    if(res.id) {
      return true;
    }

    return false;
  }
}
