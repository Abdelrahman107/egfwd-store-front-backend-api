import { CustomError } from '../error/error.model';
import dbPool from '../../database/database';
import Order from '../../types/order';
import OrderProduct from '../../types/order-product';
import { PoolClient, QueryResult } from 'pg';
import Product from '../../types/product';

export class OrderModel {
  async getAllOrders(): Promise<Order[]> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, status, user_id from ORDERS`);
      client.release();
      return result.rows;
    } catch (error) {
      throw new CustomError(`Error occured while fetching orders, ${(error as Error).message}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`INSERT INTO ORDERS (status, user_id) values ($1,$2) returning id,status,user_id`, [order.status, order.user_id]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to create order, ${(error as Error).message}`);
    }
  }
  // update order to complete
  async updateOrderStatusToComplete(id: string): Promise<Order> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`UPDATE ORDERS set status = ($1) where id = ($2) returning id,status,user_id`, ['complete', id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`Order with id ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to update order, ${(error as Error).message}`);
    }
  }
  async getAllProductsByOrderId(id: string): Promise<Product[]> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT p.name,p.price,op.quantity from products p inner join orders_products op on op.product_id = p.id where op.order_id = ($1)`, [id]);
      client.release();
      if (result.rows.length === 0) {
        throw new CustomError(`Order with id ${id} not found`);
      }
      return result.rows;
    } catch (error) {
      throw new CustomError(`Error occured while trying to fetch products, ${(error as Error).message}`);
    }
  }

  async getActiveOrdersForUser(userId: string): Promise<Order[]> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, status, user_id from ORDERS where user_id =($1) and status = ($2)`, [userId, 'active']);
      client.release();
      return result.rows;
    } catch (error) {
      throw new CustomError(`Error occured while trying to fetch orders, ${(error as Error).message}`);
    }
  }
  async getCompletedOrdersForUser(userId: string): Promise<Order[]> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`SELECT id, status, user_id from ORDERS where user_id =($1) and status = ($2)`, [userId, 'complete']);
      client.release();
      return result.rows;
    } catch (error) {
      throw new CustomError(`Error occured while trying to fetch orders, ${(error as Error).message}`);
    }
  }

  async AddProductIdToOrderId(orderId: string, productId: string, quantity: number): Promise<OrderProduct> {
    try {
      const client: PoolClient = await dbPool.connect();
      const result: QueryResult = await client.query(`INSERT INTO orders_products (order_id, product_id, quantity) values ($1,$2,$3) returning order_id,product_id,quantity`, [orderId, productId, quantity]);
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new CustomError(`Error occured while trying to add product to order, ${(error as Error).message}`);
    }
  }
}
