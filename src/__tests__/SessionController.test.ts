import request from 'supertest';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
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

describe('POST /sessions', () => {
  it('should return token', async () => {
    const response = await request(app)
      .post('/sessions')
      .set('Content-Type', 'application/json')
      .send(defaultUser);

    const decodedOldToken: any = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );
    const decodedNewToken: any = await promisify(jwt.verify)(
      response.body.token,
      authConfig.secret
    );

    expect(decodedOldToken.id).toEqual(decodedNewToken.id);
  });

  it("should return { error: 'Email is Required' }", async () => {
    const response = await request(app)
      .post('/sessions')
      .set('Content-Type', 'application/json')
      .send({ password: defaultUser.password });
    expect(response.body).toEqual({ error: 'Email is Required' });
  });

  it("should return { error: 'Password is Required' }", async () => {
    const response = await request(app)
      .post('/sessions')
      .set('Content-Type', 'application/json')
      .send({ email: defaultUser.email });
    expect(response.body).toEqual({ error: 'Password is Required' });
  });

  it("should return { error: 'User not found' }", async () => {
    const response = await request(app)
      .post('/sessions')
      .set('Content-Type', 'application/json')
      .send({ email: 'rando@randon.com', password: 'randon' });
    expect(response.body).toEqual({ error: 'User not found' });
  });

  it("should return { error: 'Password does not match' }", async () => {
    const response = await request(app)
      .post('/sessions')
      .set('Content-Type', 'application/json')
      .send({ email: defaultUser.email, password: 'randon' });
    expect(response.body).toEqual({ error: 'Password does not match' });
  });
});
