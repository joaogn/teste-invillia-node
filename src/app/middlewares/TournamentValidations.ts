import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const TournamentStoreValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
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
