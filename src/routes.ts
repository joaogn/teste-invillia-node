import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import TournamentController from './app/controllers/TournamentController';
import StepController from './app/controllers/StepController';
import PositionController from './app/controllers/PositionController';
import StepRankController from './app/controllers/StepRankController';
import TournamentRankController from './app/controllers/TournamentRankController';
import authMiddleware from './app/middlewares/auth';
import { UserStoreValidation } from './app/middlewares/UserValidations';
import { SessionStoreValidation } from './app/middlewares/SessionValidations';
import { TournamentStoreValidation } from './app/middlewares/TournamentValidations';
import {
  StepStoreValidation,
  StepIndexValidation,
} from './app/middlewares/StepValidations';
import { PositionsStoreValidation } from './app/middlewares/PositionsValidations';
import { StepRankValidation } from './app/middlewares/StepRankValidations';
import { TournamentRankValidation } from './app/middlewares/TournamentRankValidations';

const routes = Router();

routes.post('/sessions', SessionStoreValidation, SessionController.store);

routes.post('/users', UserStoreValidation, UserController.store);

routes.get('/steprank/:stepId', StepRankValidation, StepRankController.index);

routes.get(
  '/tournamentrank/:tournamentId',
  TournamentRankValidation,
  TournamentRankController.index
);

routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.post(
  '/tournaments',
  TournamentStoreValidation,
  TournamentController.store
);

routes.get('/tournaments', TournamentController.index);

routes.post('/steps', StepStoreValidation, StepController.store);
routes.get('/steps/:tournamentId', StepIndexValidation, StepController.index);

routes.post(
  '/positions/:stepId',
  PositionsStoreValidation,
  PositionController.store
);

export default routes;
