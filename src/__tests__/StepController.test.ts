import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import User from '../app/models/User';
import Tournament from '../app/models/Tournament';
import Step from '../app/models/Step';
import authConfig from '../config/auth';

let token = '';

const defaultUser = {
  name: 'default User',
  email: 'default@default.com',
  password: '123456',
  organizer: true,
};

const defaultTournament = {
  id: 1,
  name: 'default Tournament',
};

const defaultStep = {
  name: 'default Step',
  tournament_id: defaultTournament.id,
};

beforeEach(async () => {
  await User.destroy({ truncate: true });
  await Tournament.destroy({ truncate: true });
  await Step.destroy({ truncate: true });
  const user = await User.create(defaultUser);
  const payload = { id: user.id };
  token = jwt.sign(payload, authConfig.secret, {
    // tempo de expiração do token
    expiresIn: 300, // expires in 5min
  });
  await Tournament.create(defaultTournament);
  await Step.create(defaultStep);
});

describe('POST /steps', () => {
  it('should return new tournament', async () => {
    const newStep = {
      name: 'New Step',
      tournament_id: defaultTournament.id,
    };
    const response = await request(app)
      .post('/steps')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newStep);
    expect(response.body.name).toEqual(newStep.name);
    expect(response.body.tournament_id).toEqual(newStep.tournament_id);
  });

  it("should return { error: 'You can only create step with organizer' }", async () => {
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
      .post('/steps')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${playerToken}`)
      .send(defaultStep);
    expect(response.body).toEqual({
      error: 'You can only create step with organizer',
    });
  });

  it("should return { error: 'Step already exists.' }", async () => {
    const response = await request(app)
      .post('/steps')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultStep);
    expect(response.body).toEqual({ error: 'Step already exists.' });
  });

  it("should return { error: 'Name is Required' }", async () => {
    const newStep = {
      tournament_id: defaultTournament.id,
    };
    const response = await request(app)
      .post('/steps')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newStep);
    expect(response.body).toEqual({ error: 'Name is Required' });
  });

  it("should return { error: 'Tournament is Required' }", async () => {
    const newStep = {
      name: 'New Step',
    };
    const response = await request(app)
      .post('/steps')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newStep);
    expect(response.body).toEqual({ error: 'Tournament is Required' });
  });
});

describe('Get /steps/:tournamentId', () => {
  it('should return users', async () => {
    const response = await request(app)
      .get(`/steps/${defaultTournament.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body[0].name).toEqual(defaultStep.name);
  });

  it("should return { error: 'Params tournamentId need to be number' }", async () => {
    const response = await request(app)
      .get('/steps/aaa')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual({
      error: 'Params tournamentId need to be number',
    });
  });
});
