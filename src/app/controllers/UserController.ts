import { Request, Response } from 'express';
import User from '../models/User';

export interface UserType {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

class UserController {
  async store(req: Request, res: Response) {
    const data: UserType = req.body;
    const userExist = await User.findOne({ where: { email: data.email } });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email, organizer } = await User.create(data);
    return res.status(200).json({ id, name, email, organizer });
  }

  async index(req: Request, res: Response) {
    const users = await User.findAll();
    return res.status(200).json(users);
  }
}

export default new UserController();
