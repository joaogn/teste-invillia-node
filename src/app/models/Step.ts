import Sequelize, { Model } from 'sequelize';
import sequelize from '../../database';
import Tournament from './Tournament';

class Step extends Model {
  public id!: number;

  public name!: string;

  public tournament_id!: number;

  public tournament!: {
    name: string;
  };

  public readonly created_at!: Date;

  public readonly updated_at!: Date;
}

Step.init(
  {
    name: Sequelize.STRING,
  },
  {
    tableName: 'steps',
    sequelize, // this bit is important
  }
);

Step.belongsTo(Tournament, { foreignKey: 'tournament_id', as: 'tournament' });

export default Step;
