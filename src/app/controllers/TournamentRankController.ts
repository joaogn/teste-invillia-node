import { Request, Response } from 'express';
import Position from '../models/Position';
import Step from '../models/Step';
import User from '../models/User';

class TournamentRankController {
  async index(req: Request, res: Response) {
    const { tournamentId } = req.params;
    const positions = await Position.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Step,
          as: 'step',
          attributes: ['name', 'tournament_id'],
          where: { tournament_id: tournamentId },
        },
      ],
    });
    /*
    const result = positions.map((position, index) => {
      const data = {
        position: position.position,
        name: position.user.name,
        points: positons.length - index,
      };
      return data;
    });
*/
    return res.status(200).json(positions);
  }
}

export default new TournamentRankController();
