import { BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Adms extends Model {
  declare id: number;
  declare email: number;
  declare active: number;
}

Adms.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: STRING(300),
    allowNull: false,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize: db,
  modelName: 'adms',
  timestamps: false,
});

export default Adms;