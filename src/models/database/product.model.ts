import { CustomError } from '../error/error.model';
import dbPool from '../../database/database';
import { PoolClient, QueryResult } from 'pg';
import Product from '../../types/product';

export class ProductModel {
  async getAllProducts(): Promise<Product[]> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, name, price from PRODUCTS`);
      client.release();
      return result.rows;
    } catch (error) {
      throw new CustomError(`Error occured while fetching products, ${(error as Error).message}`);
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, name, price from PRODUCTS where id =($1)`, [id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`Product with id ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to fetch product, ${(error as Error).message}`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`INSERT INTO PRODUCTS (name,price) values ($1,$2) returning id,name,price`, [product.name, product.price]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to create product, ${(error as Error).message}`);
    }
  }
  async updateProduct(product: Product): Promise<Product> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`UPDATE PRODUCTS set name = ($1), price = ($2) where id = ($3) returning id,name,price`, [product.name, product.price, product.id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to update a product, ${(error as Error).message}`);
    }
  }
  async deleteProduct(id: string): Promise<Product> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`DELETE from PRODUCTS where id = ($1) returning id,name,price`, [id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`Product with id ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to delete a product, ${(error as Error).message}`);
    }
  }
}
