import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe(' Test Route GET/ localhost:3000/api', () => {
  it('Should be 200 OK', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
