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

describe('Auth API', () => {
  test('given a name and email, should create new user', async () => {
    const response = await api
      .post('/api/v1/auth/signup')
      .send({
        email: 'random_email1@test.com',
        name: 'test_user',
      })
      .expect(201);
    const token = response.body.data.token;
    const password = response.body.data.password;
    expect(token).toBeDefined();
    expect(password).toBeDefined();
  });
  test('user should be able to sign in using token', async () => {
    const response = await api
      .post('/api/v1/auth/login')
      .send({
        token: process.env.DEFAULT_ADMIN_TOKEN,
      })
      .expect(200);
  });
  test('should get user object from token', async () => {
    const token = process.env.DEFAULT_ADMIN_TOKEN;
    const response = await api
      .get('/api/v1/auth')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
    expect(response.body.user.email).toEqual('admin@admin.com');
    expect(response.body.user.role).toEqual('admin');
  });
});

afterEach(async () => {
  await clearAll();
  await mongoose.connection.close();
  await mongoose.disconnect();
});
