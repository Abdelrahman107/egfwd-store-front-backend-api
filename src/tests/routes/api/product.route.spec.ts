import { response } from 'express';
import supertest from 'supertest';
import app from '../../../index';
import Product from '../../../types/product';
const request = supertest(app);
const testProduct = {
  name: 'Test Product',
  price: 12
} as Product;

describe('Suite: Test Products API Endpoints and Routes', () => {
  describe('Suite: POST/api/products', () => {
    it('should create a new product', async () => {
      const response = await request.post('/api/products').send(testProduct);
      const { id, name, price } = response.body.data;
      expect(response.status).toBe(201);
      expect(name).toEqual(testProduct.name);
      expect(price).toEqual(testProduct.price);
      testProduct.id = id;
    });
  });
  describe('Suite: GET/api/products', () => {
    it('should get all products', async () => {
      const response = await request.get('/api/products');
      expect(response.status).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
  describe('Suite: GET/api/products/:id', () => {
    it('should get a product by id', async () => {
      const response = await request.get(`/api/products/${testProduct.id}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.id).toEqual(testProduct.id);
    });
  });
  describe('Suite: PUT/api/products', () => {
    it('should update a product', async () => {
      const response = await request.put(`/api/products`).set('Content-Type', 'application/json').send({
        id: testProduct.id,
        name: 'Updated Product',
        price: 15
      });
      expect(response.status).toEqual(200);
      expect(response.body.data.name).toEqual('Updated Product');
      expect(response.body.data.price).toEqual(15);
    });
  });
  describe('Suite: DELETE/api/products/:id', () => {
    it('should delete a product', async () => {
      const response = await request.delete(`/api/products/${testProduct.id}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.id).toEqual(testProduct.id);
    });
  });
});
