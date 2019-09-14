import { Request, Response } from 'express';
import Position from '../models/Position';
import Step from '../models/Step';
import User from '../models/User';
import Tournament from '../models/Tournament';

interface StringMap {
  [s: string]: number;
}

class TournamentRankController {
  async index(req: Request, res: Response) {
    const points = [];
    const { tournamentId } = req.params;

    const tournament = await Tournament.findByPk(tournamentId);

    if (!tournament) {
      return res.status(400).json({ error: 'This tournament not exists.' });
    }

    const steps = await Step.findAll({
      where: { tournament_id: tournamentId },
      attributes: ['id', 'name'],
    });

    const stepsPoints = steps.map(async item => {
      const positions = await Position.findAll({
        where: { step_id: item.id },
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
      points.push(...result);
    });

    await Promise.all(stepsPoints);

    const totalPoints: StringMap = points.reduce((prev, cur) => {
      prev[cur.name] = (prev[cur.name] || 0) + cur.points;
      return prev;
    }, {});

    const ranking = Object.entries(totalPoints)
      .map(([key, value]) => {
        const data = {
          name: key,
          points: value,
        };
        return data;
      })
      .sort((a, b) => {
        return Number(a.points < b.points);
      })
      .map((item, index) => {
        const data = {
          position: index + 1,
          ...item,
        };
        return data;
      });

    const result = {
      tournament: tournament.name,
      steps: steps.map(step => step.name),
      ranking,
    };

    return res.status(200).json(result);
  }
}

export default new TournamentRankController();
