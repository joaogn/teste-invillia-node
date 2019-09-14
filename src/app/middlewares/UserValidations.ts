import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const UserStoreValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
      .email()
      .required('Email is Required'),
    password: Yup.string()
      .required('Password is Required')
      .min(6),
    organizer: Yup.boolean(),
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
