import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const StepStoreValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    tournament_id: Yup.number().required('Tournament is Required'),
  });

  schema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

export const StepIndexValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    tournamentId: Yup.number().typeError(
      'Params tournamentId need to be number'
    ),
  });

  schema
    .validate(req.params)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};
