import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const StepRankValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    stepId: Yup.number().typeError('Params stepId need to be number'),
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
