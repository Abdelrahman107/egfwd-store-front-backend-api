import { response } from 'express';
import { NotificationResponseMessage } from 'pg-protocol/dist/messages';
import supertest from 'supertest';
import app from '../../../index';
import User from '../../../types/user';
const request = supertest(app);
let token: string = '';
const testUser = {
  first_name: 'Test',
  last_name: 'User',
  email: `testUser@gmail.com`,
  password: 'testUser'
} as User;
describe('Suite: Test Users API Endpoints and Routes', () => {
  describe('Suite: POST/api/users', () => {
    it('should create a new user', async () => {
      const response = await request.post('/api/users').send(testUser);
      const { id, first_name, last_name, email } = response.body.data;
      expect(response.status).toBe(201);
      expect(first_name).toEqual(testUser.first_name);
      expect(last_name).toEqual(testUser.last_name);
      expect(email).toEqual(testUser.email);
      testUser.id = id;
    });

    it('should not create a new user with the same email', async () => {
      const response = await request.post('/api/users').send(testUser);
      expect(response.status).toEqual(500);
    });
  });
  describe('Suite: POST/api/users/authenicate', () => {
    it('should login a user', async () => {
      const response = await request.post('/api/users/authenticate').send({
        email: testUser.email,
        password: testUser.password
      });

      expect(response.status).toEqual(200);
      expect(response.body.data.token).toBeTruthy();
      token = response.body.data.token;
    });
    it('should not login a user with wrong password', async () => {
      const response = await request.post('/api/users/authenticate').send({
        email: testUser.email,
        password: 'wrongPassword'
      });
      expect(response.status).not.toEqual(200);
    });
  });
  describe('Suite: GET/api/users', () => {
    it('should get all users', async () => {
      const response = await request.get('/api/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    // shoudnt get without token
    it('should not get all users without token', async () => {
      const response = await request.get('/api/users');
      expect(response.status).not.toEqual(200);
    });
  });
  describe('Suite: GET/api/users/:id', () => {
    it('should get a user by id', async () => {
      const response = await request.get(`/api/users/${testUser.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.data.id).toEqual(testUser.id);
      expect(response.body.data.first_name).toEqual(testUser.first_name);
      expect(response.body.data.last_name).toEqual(testUser.last_name);
      expect(response.body.data.email).toEqual(testUser.email);
    });
    it('should not get a user by id without token', async () => {
      const response = await request.get(`/api/users/${testUser.id}`);
      expect(response.status).not.toEqual(200);
    });
  });
  describe('Suite: PUT/api/users/', () => {
    it('should update a user ', async () => {
      const body = {
        id: testUser.id,
        first_name: 'Updated',
        last_name: 'User',
        email: 'UpdatedUser@gmail.com',
        password: 'UpdatedUser'
      };
      const response = await request.put(`/api/users`).set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json').send(body);
      expect(response.status).toEqual(200);
      expect(response.body.data.id).toEqual(testUser.id);
      expect(response.body.data.first_name).toEqual('Updated');
      expect(response.body.data.last_name).toEqual('User');
      expect(response.body.data.email).toEqual('UpdatedUser@gmail.com');
      expect(response.body.data.password).not.toEqual('UpdatedUser');
    });
    it('should not update a user without token', async () => {
      const body = {
        id: testUser.id,
        first_name: 'Updated',
        last_name: 'User',
        email: 'UpdatedUser2@gmail.com',
        password: 'UpdatedUser'
      };
      const response = await request.put(`/api/users`).set('Content-Type', 'application/json').send(body);
      expect(response.status).not.toEqual(200);
    });
  });
  describe('Suite: DELETE/api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request.delete(`/api/users/${testUser.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });
    it('should not delete a user without token', async () => {
      const response = await request.delete(`/api/users/${testUser.id}`);
      expect(response.status).not.toEqual(200);
    });
  });
});
