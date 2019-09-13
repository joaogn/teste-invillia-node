import { Request, Response } from 'express';
import Position from '../models/Position';
import User from '../models/User';

class StepRankController {
  async index(req: Request, res: Response) {
    const { stepId } = req.params;
    const positions = await Position.findAll({
      where: { step_id: stepId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    const result = positions.map((position, index) => {
      const data = {
        position: position.position,
        name: position.user.name,
        points: positions.length - index,
      };

      return data;
    });

    return res.status(200).json(result);
  }
}

export default new StepRankController();
