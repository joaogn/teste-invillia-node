import { Request, Response } from 'express';
import Step from '../models/Step';
import Tournament from '../models/Tournament';
import User from '../models/User';

export interface TournamentType {
  name: string;
  tournament_id: number;
}

class StepController {
  async store(req: Request, res: Response) {
    const data: TournamentType = req.body;

    const isOrganizer = await User.findOne({
      where: { id: req.userId, organizer: true },
    });

    if (!isOrganizer) {
      return res
        .status(401)
        .json({ error: 'You can only create step with organizer' });
    }

    const stepExist = await Step.findOne({
      where: { name: data.name, tournament_id: data.tournament_id },
    });
    if (stepExist) {
      return res.status(400).json({ error: 'Step already exists.' });
    }
    const { id, name, tournament_id } = await Step.create(data);
    return res.status(200).json({ id, name, tournament_id });
  }

  async index(req: Request, res: Response) {
    const { tournamentId } = req.params;
    const steps = await Step.findAll({
      where: { tournament_id: tournamentId },
      include: [
        {
          model: Tournament,
          as: 'tournament',
          attributes: ['name'],
        },
      ],
    });
    return res.status(200).json(steps);
  }
}

export default new StepController();
