import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import User from '../app/models/User';
import Tournament from '../app/models/Tournament';
import authConfig from '../config/auth';

let token = '';

const defaultUser = {
  name: 'default User',
  email: 'default@default.com',
  password: '123456',
  organizer: true,
};

const defaultTournament = {
  name: 'default Tournament',
};

beforeEach(async () => {
  await User.destroy({ truncate: true });
  await Tournament.destroy({ truncate: true });
  const user = await User.create(defaultUser);
  const payload = { id: user.id };
  token = jwt.sign(payload, authConfig.secret, {
    // tempo de expiração do token
    expiresIn: 300, // expires in 5min
  });
  await Tournament.create(defaultTournament);
});

describe('POST /tournaments', () => {
  it('should return new tournament', async () => {
    const newTournament = {
      name: 'New Tournament',
    };
    const response = await request(app)
      .post('/tournaments')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newTournament);
    expect(response.body.name).toEqual(newTournament.name);
  });

  it("should return { error: 'You can only create tournament with organizer' }", async () => {
    const playerUser = {
      name: 'player User',
      email: 'player@player.com',
      password: '123456',
    };
    const user = await User.create(playerUser);
    const payload = { id: user.id };
    const playerToken = await jwt.sign(payload, authConfig.secret, {
      // tempo de expiração do token
      expiresIn: 300, // expires in 5min
    });
    const response = await request(app)
      .post('/tournaments')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${playerToken}`)
      .send(defaultTournament);
    expect(response.body).toEqual({
      error: 'You can only create tournament with organizer',
    });
  });

  it("should return { error: 'Tournament already exists.' }", async () => {
    const response = await request(app)
      .post('/tournaments')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultTournament);
    expect(response.body).toEqual({ error: 'Tournament already exists.' });
  });

  it("should return { error: 'Name is Required' }", async () => {
    const newTournament = {
      other: 'New Tournament',
    };
    const response = await request(app)
      .post('/tournaments')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newTournament);
    expect(response.body).toEqual({ error: 'Name is Required' });
  });
});

describe('Get /tournaments', () => {
  it('should return users', async () => {
    const response = await request(app)
      .get('/tournaments')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual(defaultTournament.name);
  });
});
