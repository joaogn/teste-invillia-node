import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export interface PositionType {
  user_id: number;
  position: number;
}

export const PositionsStoreValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Yup.array()
    .of(
      Yup.object({
        user_id: Yup.number().required('User is Required'),
        position: Yup.number().required('Number is Required'),
      })
    )
    .test(
      'position repeat',
      'Position is repeated',
      // o Set não permite valor repetidos, então se tiver valores repetidos
      // o retorno do Set sera menor que o valor do vetor passado
      (value: PositionType[]): boolean =>
        new Set(value.map(item => item.position)).size ===
        value.map(item => item.position).length
    )
    .test(
      'user repeat',
      'User is repeated',
      // o Set não permite valor repetidos, então se tiver valores repetidos
      // o retorno do Set sera menor que o valor do vetor passado
      (value: PositionType[]): boolean =>
        new Set(value.map(item => item.user_id)).size ===
        value.map(item => item.user_id).length
    );

  const paramsSchema = Yup.object().shape({
    stepId: Yup.number().typeError('Params stepId need to be number'),
  });

  schema
    .validate(req.body)
    .then(() => {
      paramsSchema
        .validate(req.params)
        .then(() => {
          next();
        })
        .catch(err => {
          res.status(400).json({ error: err.message });
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};
