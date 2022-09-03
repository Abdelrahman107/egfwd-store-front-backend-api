import { CustomError } from '../error/error.model';
import dbPool from '../../database/database';
import User from '../../types/user';
import { PoolClient, QueryResult } from 'pg';
import { comparePassword, hashPassword } from '../../utils/hashing';
import { resourceLimits } from 'worker_threads';

export class UserModel {
  async getAllUsers(): Promise<User[]> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, first_name,last_name,email from USERS`);
      client.release();
      return result.rows;
    } catch (error) {
      throw new CustomError(`Error occured while fetching users, ${(error as Error).message}`);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, first_name,last_name,email from USERS where id =($1)`, [id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`User with id ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to fetch user, ${(error as Error).message}`);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`INSERT INTO USERS (first_name,last_name,email,password) values ($1,$2,$3,$4) returning id,first_name,last_name,email`, [user.first_name, user.last_name, user.email, hashPassword(user.password)]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to create user, ${(error as Error).message}`);
    }
  }
  async updateUser(user: User): Promise<User> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`UPDATE USERS set first_name = ($1), last_name = ($2), email = ($3), password = ($4) where id = ($5) returning id,first_name,last_name,email`, [user.first_name, user.last_name, user.email, hashPassword(user.password), user.id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`User with id ${user.id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to update a user, ${(error as Error).message}`);
    }
  }
  // async updateUserById(id: string, user: User): Promise<User> {
  //   try {
  //     const client: PoolClient = await dbPool.connect();
  //     const result: QueryResult = await client.query(`UPDATE USERS set first_name = ($1), last_name = ($2), email = ($3), password = ($4) where id = ($5) returning id,first_name,last_name,email`, [user.first_name, user.last_name, user.email, user.password, id]);
  //     client.release();
  //     return result.rows[0];
  //   } catch (error) {
  //     throw new CustomError(`Error occured while trying to update a user, ${(error as Error).message}`);
  //   }
  // }

  async deleteUserById(id: string): Promise<User> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`DELETE from USERS where id = ($1) returning id,first_name,last_name,email`, [id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`User with id ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to delete a user, ${(error as Error).message}`);
    }
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT * from USERS where email = ($1)`, [email]);

      if (result.rows.length) {
        const hashedPassword = result.rows[0].password;
        if (comparePassword(password, hashedPassword)) {
          const result2: QueryResult = await client.query(`SELECT id, first_name,last_name,email from USERS where email = ($1)`, [email]);
          return result2.rows[0];
        }
      }
      client.release();
      return null;
    } catch (error) {
      throw new CustomError(`Error occured while trying to authenticate user, ${(error as Error).message}`);
    }
  }
}
