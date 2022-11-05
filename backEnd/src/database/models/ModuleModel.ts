import { DATE, BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Module extends Model {
  declare id: number;
  declare name: string;
  declare premium: boolean;
  declare phoneNumber: string;
  declare image: string;
}

Module.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(30),
    allowNull: false,
  },
  description: {
    type: STRING(60),
    allowNull: false,
  },
  image: {
    type: STRING(300),
    allowNull: false,
  },
  premium: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'modules',
  timestamps: false,
});

export default Module;