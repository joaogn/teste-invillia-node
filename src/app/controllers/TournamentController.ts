import { Request, Response } from 'express';
import Tournament from '../models/Tournament';
import User from '../models/User';

export interface TournamentType {
  name?: string;
}

class TournamentController {
  async store(req: Request, res: Response) {
    const data: TournamentType = req.body;
    const isOrganizer = await User.findOne({
      where: { id: req.userId, organizer: true },
    });

    if (!isOrganizer) {
      return res
        .status(401)
        .json({ error: 'You can only create tournament with organizer' });
    }

    const tournamentExist = await Tournament.findOne({
      where: { name: data.name },
    });
    if (tournamentExist) {
      return res.status(400).json({ error: 'Tournament already exists.' });
    }
    const { id, name } = await Tournament.create(data);
    return res.status(200).json({ id, name });
  }

  async index(req: Request, res: Response) {
    const tournaments = await Tournament.findAll();
    return res
      .status(200)
      .json(tournaments.map(({ id, name }) => ({ id, name })));
  }
}

export default new TournamentController();
