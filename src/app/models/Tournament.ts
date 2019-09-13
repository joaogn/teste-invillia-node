import Sequelize, { Model } from 'sequelize';
import sequelize from '../../database';

class Tournament extends Model {
  public id!: number;

  public name!: string;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;
}

Tournament.init(
  {
    name: Sequelize.STRING,
  },
  {
    tableName: 'tournaments',
    sequelize, // this bit is important
  }
);

export default Tournament;
