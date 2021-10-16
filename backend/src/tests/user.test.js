import jest from 'jest';
import supertest from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

import applyDatabaseSetup from './test_db';
import { clearAll } from './test_db';

const api = supertest(app);

beforeEach(async () => {
  await mongoose.connection.close();
  await mongoose.disconnect();
  await applyDatabaseSetup();
});

let userId1;

describe('User API', () => {
  test('create user should create new user', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const email = 'random_user1@test.com';
    const password = 'randomPassword';
    const response = await api
      .post('/api/v1/user/')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email,
        password,
      });
    const userId = response.body.data.id;
    expect(userId).toBeDefined();
  });

  test('create user response contain json in response headers', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const email = 'random_user1@test.com';
    const password = 'randomPassword';
    const response = await api
      .post('/api/v1/user/')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email,
        password,
      });
    userId1 = response.body.data.id;
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('create user should respond with a 200 status code', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const email = 'random_user1@test.com';
    const password = 'randomPassword';
    const response = await api
      .post('/api/v1/user/')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        email,
        password,
      });
    const userID = response.body.data.id;
    expect(response.statusCode).toBe(201);
  });

  test('get all users should respond with a status code of 200', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const response = await api
      .get('/api/v1/user/')
      .set({ Authorization: `Bearer ${token}` });
    expect(response.statusCode).toBe(200);
  });

  test('get user should respond with a status code of 200', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const response = await api
      .get(`/api/v1/user/${userId1}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.statusCode).toBe(200);
  });
  test('get user should respond with a status code of 404', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const randomId = '7285abce70b45830018cavzx';
    const response = await api
      .get(`/api/v1/user/${randomId}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.statusCode).toBe(404);
  });
});

afterEach(async () => {
  await clearAll();
  await mongoose.connection.close();
  await mongoose.disconnect();
});
