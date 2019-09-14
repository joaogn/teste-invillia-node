import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import User from '../app/models/User';
import Tournament from '../app/models/Tournament';
import Step from '../app/models/Step';
import Position from '../app/models/Position';
import authConfig from '../config/auth';

let token = '';

const defaultUser = {
  id: 1,
  name: 'default User',
  email: 'default@default.com',
  password: '123456',
  organizer: true,
};

const defaultUser2 = {
  id: 2,
  name: 'default User 2',
  email: 'default2@default2.com',
  password: '123456',
  organizer: true,
};

const defaultTournament = {
  id: 1,
  name: 'default Tournament',
};

const defaultStep = {
  id: 1,
  name: 'default Step',
  tournament_id: defaultTournament.id,
};

const defaultStep2 = {
  id: 2,
  name: 'default Step2',
  tournament_id: defaultTournament.id,
};

const defaultPositions = [
  {
    user_id: defaultUser.id,
    position: 1,
  },
  {
    user_id: defaultUser2.id,
    position: 2,
  },
];

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
  await User.create(defaultUser2);
  await Tournament.create(defaultTournament);
  await Step.create(defaultStep);
  await Step.create(defaultStep2);
  const createPositions = defaultPositions.map(async item => {
    const { user_id, step_id, position } = await Position.create({
      user_id: item.user_id,
      step_id: defaultStep.id,
      position: item.position,
    });

    return { user_id, step_id, position };
  });
  await Promise.all(createPositions);
});

describe('POST /positions/:stepId', () => {
  it('should return new tournament', async () => {
    const response = await request(app)
      .post(`/positions/${defaultStep2.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPositions);
    expect(response.body[0].user_id).toEqual(defaultPositions[0].user_id);
    expect(response.body[0].position).toEqual(defaultPositions[0].position);
    expect(response.body[1].user_id).toEqual(defaultPositions[1].user_id);
    expect(response.body[1].position).toEqual(defaultPositions[1].position);
  });

  it("should return { error: 'You can only create positions with organizer' }", async () => {
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
      .post(`/positions/${defaultStep.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${playerToken}`)
      .send(defaultPositions);
    expect(response.body).toEqual({
      error: 'You can only create positions with organizer',
    });
  });

  it("should return { error: 'This step not exists.' }", async () => {
    const response = await request(app)
      .post('/positions/100')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPositions);
    expect(response.body).toEqual({
      error: 'This step not exists.',
    });
  });

  it("should return { error: 'Positions for this step already exists.' }", async () => {
    const response = await request(app)
      .post(`/positions/${defaultStep.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPositions);
    expect(response.body).toEqual({
      error: 'Positions for this step already exists.',
    });
  });

  it("should return { error: 'User is Required' }", async () => {
    const newPositions = [
      {
        position: 1,
      },
      {
        user_id: defaultUser2.id,
        position: 2,
      },
    ];
    const response = await request(app)
      .post(`/positions/${defaultStep.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newPositions);
    expect(response.body).toEqual({
      error: 'User is Required',
    });
  });

  it("should return { error: 'Position is Required' }", async () => {
    const newPositions = [
      {
        user_id: defaultUser.id,
      },
      {
        user_id: defaultUser2.id,
        position: 2,
      },
    ];
    const response = await request(app)
      .post(`/positions/${defaultStep.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newPositions);
    expect(response.body).toEqual({
      error: 'Position is Required',
    });
  });

  it("should return { error: 'Position is repeated' }", async () => {
    const newPositions = [
      {
        user_id: defaultUser.id,
        position: 1,
      },
      {
        user_id: defaultUser2.id,
        position: 1,
      },
    ];
    const response = await request(app)
      .post(`/positions/${defaultStep.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newPositions);
    expect(response.body).toEqual({
      error: 'Position is repeated',
    });
  });

  it("should return { error: 'User is repeated' }", async () => {
    const newPositions = [
      {
        user_id: defaultUser.id,
        position: 1,
      },
      {
        user_id: defaultUser.id,
        position: 2,
      },
    ];
    const response = await request(app)
      .post(`/positions/${defaultStep.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newPositions);
    expect(response.body).toEqual({
      error: 'User is repeated',
    });
  });

  it("should return { error: 'Params stepId need to be number' }", async () => {
    const response = await request(app)
      .post('/positions/a')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPositions);
    expect(response.body).toEqual({
      error: 'Params stepId need to be number',
    });
  });
});
