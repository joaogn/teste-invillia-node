import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import User from '../app/models/User';
import authConfig from '../config/auth';

let token = '';

const defaultUser = {
  name: 'default User',
  email: 'default@default.com',
  password: '123456',
};

beforeEach(async () => {
  await User.destroy({ truncate: true });
  const user = await User.create(defaultUser);
  const payload = { id: user.id };
  token = jwt.sign(payload, authConfig.secret, {
    // tempo de expiração do token
    expiresIn: 300, // expires in 5min
  });
});

describe('POST /users', () => {
  it('should return new user', async () => {
    const newUser = {
      name: 'New User',
      email: 'new@new.com',
      password: '123456',
    };
    const response = await request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(newUser);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual(newUser.name);
    expect(response.body.email).toEqual(newUser.email);
  });

  it("should return { error: 'User already exists.' }", async () => {
    const response = await request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(defaultUser);
    expect(response.body).toEqual({ error: 'User already exists.' });
  });

  it("should return { error: 'Name is Required' }", async () => {
    const newUser = {
      email: 'new@new.com',
      password: '123456',
    };
    const response = await request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(newUser);
    expect(response.body).toEqual({ error: 'Name is Required' });
  });

  it("should return { error: 'Email is Required' }", async () => {
    const newUser = {
      name: 'New User',
      password: '123456',
    };
    const response = await request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(newUser);
    expect(response.body).toEqual({ error: 'Email is Required' });
  });

  it("should return { error: 'Password is Required' }", async () => {
    const newUser = {
      name: 'New User',
      email: 'new@new.com',
    };
    const response = await request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(newUser);
    expect(response.body).toEqual({ error: 'Password is Required' });
  });
});

describe('Get /users', () => {
  it('should return users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual(defaultUser.name);
    expect(response.body[0].email).toEqual(defaultUser.email);
  });
});
