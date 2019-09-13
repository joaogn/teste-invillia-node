import { Router } from 'express';
import UserController from './app/controllers/UserController';
import TournamentController from './app/controllers/TournamentController';
import StepController from './app/controllers/StepController';
import PositionController from './app/controllers/PositionController';
import StepRankController from './app/controllers/StepRankController';
import TournamentRankController from './app/controllers/TournamentRankController';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/tournaments', TournamentController.store);
routes.get('/tournaments', TournamentController.index);

routes.post('/steps', StepController.store);
routes.get('/steps/:tournamentId', StepController.index);

routes.post('/positions', PositionController.store);

routes.get('/steprank/:stepId', StepRankController.index);

routes.get('/tournamentrank/:tournamentId', TournamentRankController.index);

export default routes;
