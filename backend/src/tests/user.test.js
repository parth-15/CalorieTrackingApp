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

describe('User API', () => {
  test('should create new user', async () => {
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
});

afterEach(async () => {
  await clearAll();
  await mongoose.connection.close();
  await mongoose.disconnect();
});
