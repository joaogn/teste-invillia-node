import { Router } from 'express';
import UserController from './app/controllers/UserController';
import TournamentController from './app/controllers/TournamentController';
import StepController from './app/controllers/StepController';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/tournaments', TournamentController.store);
routes.get('/tournaments', TournamentController.index);

routes.post('/steps', StepController.store);
routes.get('/steps/:tournamentId', StepController.index);

export default routes;
