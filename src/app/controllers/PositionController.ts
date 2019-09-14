import { Request, Response } from 'express';
import Position from '../models/Position';
import User from '../models/User';

export interface PositionType {
  user_id: number;
  position: number;
}

class PositionController {
  async store(req: Request, res: Response) {
    const data: PositionType[] = req.body;
    const { stepId } = req.params;

    const isOrganizer = await User.findOne({
      where: { id: req.userId, organizer: true },
    });

    if (!isOrganizer) {
      return res
        .status(401)
        .json({ error: 'You can only create positions with organizer' });
    }

    const stepExist = await Position.findOne({
      where: { step_id: stepId },
    });
    if (stepExist) {
      return res
        .status(400)
        .json({ error: 'Positions for this step already exists.' });
    }
    const createPositions = data.map(async item => {
      const { user_id, step_id, position } = await Position.create({
        user_id: item.user_id,
        step_id: Number(stepId),
        position: item.position,
      });

      return { user_id, step_id, position };
    });
    const result = await Promise.all(createPositions);
    return res.status(200).json(result);
  }
}

export default new PositionController();
