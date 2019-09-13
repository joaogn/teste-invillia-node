import { Request, Response } from 'express';
import Position from '../models/Position';
import User from '../models/User';
import Step from '../models/Step';
import Tournament from '../models/Tournament';

class StepRankController {
  async index(req: Request, res: Response) {
    const { stepId } = req.params;

    const stepInfo = await Step.findByPk(stepId, {
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['name'],
        },
      ],
    });

    if (!stepInfo) {
      return res.status(400).json({ error: 'This step not exists.' });
    }

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

    const ranking = positions.map((position, index) => {
      const data = {
        position: position.position,
        name: position.user.name,
        points: positions.length - index,
      };
      return data;
    });

    const result = {
      tournament: stepInfo.tournament.name,
      step: stepInfo.name,
      ranking,
    };

    return res.status(200).json(result);
  }
}

export default new StepRankController();
