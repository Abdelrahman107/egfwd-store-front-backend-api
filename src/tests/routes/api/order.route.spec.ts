import supertest from 'supertest';
import app from '../../../index';
import User from '../../../types/user';
import Order from '../../../types/order';
import Product from '../../../types/product';
import OrderProduct from '../../../types/order-product';
import dbPool from '../../../database/database';
const request = supertest(app);
let token: string = '';
const testUser = {
  first_name: 'User',
  last_name: 'Test',
  email: `UserForOrder@gmail.com`,
  password: 'UserForOrder'
} as User;
const testProduct = {
  name: 'Test Product',
  price: 10
} as Product;
const testOrder = {
  status: 'active'
} as Order;
const testOrderProduct = {
  quantity: 20
} as OrderProduct;
describe('Suite: Test Orders API Endpoints and Routes', () => {
  beforeAll(async () => {
    const response = await request.post('/api/users').send(testUser);
    const { id, first_name, last_name, email } = response.body.data;
    testUser.id = id;
    const response2 = await request.post('/api/users/authenticate').send({
      email: testUser.email,
      password: testUser.password
    });
    testOrder.user_id = id;
    token = response2.body.data.token;
    const response3 = await request.post('/api/products').send(testProduct);
    testProduct.id = response3.body.data.id;
  });

  afterAll(async () => {
    const conn = await dbPool.connect();
    await conn.query('DELETE FROM users WHERE id = $1', [testUser.id]);
    await conn.query('DELETE FROM products WHERE id = $1', [testProduct.id]);
    await conn.query('DELETE FROM orders WHERE user_id = $1', [testOrder.id]);
  });

  describe('Suite: POST/api/orders', () => {
    it('should create a new order', async () => {
      const response = await request.post('/api/orders').set('Authorization', `Bearer ${token}`).send(testOrder);
      expect(response.status).toBe(201);
      expect(response.body.data.user_id).toEqual(testUser.id);
      testOrder.id = response.body.data.id;
    });

    it('should not create a new order without token', async () => {
      const response = await request.post('/api/orders').send(testOrder);
      expect(response.status).not.toEqual(201);
    });
  });

  describe('Suite: GET/api/orders', () => {
    it('should get all orders', async () => {
      const response = await request.get('/api/orders').set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].status).toEqual('active');
    });

    it('should not get all orders without token', async () => {
      const response = await request.get('/api/orders');
      expect(response.status).not.toEqual(200);
    });
  });

  // add product to order
  describe(`Suite: POST/api/orders/:product_id/:order_id//add-product-to-order`, () => {
    it('should add product to order', async () => {
      const response = await request.post(`/api/orders/${testProduct.id}/${testOrder.id}/add-product-to-order`).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').send({
        quantity: 20
      });
      expect(response.status).toEqual(201);
    });

    it('should not add product to order without token', async () => {
      const response = await request.post(`/api/orders/${testProduct.id}/${testOrder.id}/add-product-to-order`).send({
        quantity: 20
      });
      expect(response.status).not.toEqual(201);
    });
  });

  describe(`Suite: GET/api/orders/:order_id/get-products-order`, () => {
    it('should get products in order', async () => {
      const response = await request.get(`/api/orders/${testOrder.id}/get-products-order`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].quantity).toEqual(20);
    });

    it('should not get products in order without token', async () => {
      const response = await request.get(`/api/orders/${testOrder.id}/get-products-order`);
      expect(response.status).not.toEqual(200);
    });
  });
  describe(`Suite: GET/api/orders/:user_id/get-active-orders`, () => {
    it('should get active orders for user', async () => {
      const response = await request.get(`/api/orders/${testUser.id}/get-active-orders`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].status).toEqual('active');
      expect(response.body.data[0].status).not.toEqual('complete');
    });
  });
  describe(`Suite: POST/api/orders/:order_id/update-status-complete`, () => {
    it('should update order status to complete', async () => {
      const response = await request.put(`/api/orders/${testOrder.id}/update-status-complete`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.status).toEqual('complete');
    });

    it('should not update order status to complete without token', async () => {
      const response = await request.put(`/api/orders/${testOrder.id}/update-status-complete`);
      expect(response.status).not.toEqual(200);
    });
  });

  // get-complete-orders GET
  describe(`Suite: GET/api/orders/:user_id/get-complete-orders`, () => {
    it('should get complete orders for user', async () => {
      const response = await request.get(`/api/orders/${testUser.id}/get-complete-orders`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].status).toEqual('complete');
    });
  });
});
