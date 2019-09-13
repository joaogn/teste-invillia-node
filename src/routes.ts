import { Router } from 'express';
import UserController from './app/controllers/UserController';
import TournamentController from './app/controllers/TournamentController';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/tournaments', TournamentController.store);
routes.get('/tournaments', TournamentController.index);

export default routes;
