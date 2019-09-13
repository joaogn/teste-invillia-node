import { Request, Response } from 'express';
import Tournament from '../models/Tournament';

export interface TournamentType {
  name?: string;
}

class TournamentController {
  async store(req: Request, res: Response) {
    const data: TournamentType = req.body;
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
    return res.status(200).json(tournaments);
  }
}

export default new TournamentController();
