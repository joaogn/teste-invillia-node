import Sequelize, { Model } from 'sequelize';
import sequelize from '../../database';
import Step from './Step';
import User from './User';

class Position extends Model {
  public id!: number;

  public user_id!: number;

  public step_id!: number;

  public position!: number;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  public readonly user: {
    name: string;
  };
}

Position.init(
  {
    position: Sequelize.INTEGER,
  },
  {
    tableName: 'users_steps',
    sequelize, // this bit is important
  }
);

Step.hasMany(Position, { foreignKey: 'step_id', as: 'step' });
Position.belongsTo(Step, { foreignKey: 'step_id', as: 'step' });

User.hasMany(Position, { foreignKey: 'user_id', as: 'user' });
Position.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Position;
