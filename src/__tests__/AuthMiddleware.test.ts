import request from 'supertest';
import app from '../app';
import User from '../app/models/User';

const defaultUser = {
  name: 'default User',
  email: 'default@default.com',
  password: '123456',
};

beforeEach(async () => {
  await User.destroy({ truncate: true });
  await User.create(defaultUser);
});

describe('Auth test using Get /users', () => {
  it("should return { error: 'Token not provided' }", async () => {
    const response = await request(app)
      .get('/users')
      .set('Content-Type', 'application/json');
    expect(response.body).toEqual({ error: 'Token not provided' });
  });
  it("should return { error: 'Invalid token' }", async () => {
    const response = await request(app)
      .get('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer aaaaaaaaaaaaaaaa`);
    expect(response.body).toEqual({ error: 'Invalid token' });
  });
});
