import { Request, Response } from 'express';
import Position from '../models/Position';

export interface TournamentType {
  user_id: number;
  step_id: number;
  position: number;
}

class PositionController {
  async store(req: Request, res: Response) {
    const data: TournamentType = req.body;
    const stepExist = await Position.findOne({
      where: { user_id: data.user_id, step_id: data.step_id },
    });
    if (stepExist) {
      return res
        .status(400)
        .json({ error: 'Position for this user is this step already exists.' });
    }
    const { user_id, step_id, position } = await Position.create(data);
    return res.status(200).json({ user_id, step_id, position });
  }
}

export default new PositionController();
