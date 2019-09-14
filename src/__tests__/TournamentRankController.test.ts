import request from 'supertest';
import app from '../app';
import User from '../app/models/User';
import Tournament from '../app/models/Tournament';
import Step from '../app/models/Step';
import Position from '../app/models/Position';

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
  await User.create(defaultUser);
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
  const createPositions2 = defaultPositions.map(async item => {
    const { user_id, step_id, position } = await Position.create({
      user_id: item.user_id,
      step_id: defaultStep2.id,
      position: item.position,
    });

    return { user_id, step_id, position };
  });
  await Promise.all([createPositions, createPositions2]);
});

describe('GET /tournamentrank/:tournamentId', () => {
  it('should step ranking', async () => {
    const response = await request(app)
      .get(`/tournamentrank/${defaultTournament.id}`)
      .set('Content-Type', 'application/json');
    expect(response.body.tournament).toEqual(defaultTournament.name);
    expect(response.body.steps).toEqual([defaultStep.name, defaultStep2.name]);
    expect(response.body.ranking[0].name).toEqual(defaultUser.name);
    expect(response.body.ranking[0].position).toEqual(
      defaultPositions[0].position
    );
    expect(response.body.ranking[0].points).toEqual(4);
    expect(response.body.ranking[1].name).toEqual(defaultUser2.name);
    expect(response.body.ranking[1].position).toEqual(
      defaultPositions[1].position
    );
    expect(response.body.ranking[1].points).toEqual(2);
  });

  it("should return { error: 'This tournament not exists.' }", async () => {
    const response = await request(app)
      .get(`/tournamentrank/100`)
      .set('Content-Type', 'application/json');
    expect(response.body).toEqual({
      error: 'This tournament not exists.',
    });
  });

  it("should return { error: 'Params tournamentId need to be number' }", async () => {
    const response = await request(app)
      .get(`/tournamentrank/a`)
      .set('Content-Type', 'application/json');
    expect(response.body).toEqual({
      error: 'Params tournamentId need to be number',
    });
  });
});
